import { authOptions } from "@/lib/auth";
import { generateInvoicePdf, sendInvoiceEmail } from "@/lib/invoice";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchaseId = params?.id;

    if (!purchaseId) {
      return NextResponse.json(
        { error: "Purchase ID is required" },
        { status: 400 },
      );
    }

    // Check for existing invoice
    const invoice = await prisma.invoice.findFirst({ where: { purchaseId } });
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Fetch purchase details
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: {
        PurchaseItem: true,
        user: true,
        Invoice: true,
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 },
      );
    }

    // Verify ownership
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || purchase.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Generate PDF

    const pdfBuffer = await generateInvoicePdf({
      ...purchase,
      invoiceNumber: invoice.invoiceNumber,
      customerName: purchase.customerName ?? undefined,
      customerEmail: purchase.customerEmail ?? undefined,
      totalPrice:
        typeof purchase.totalPrice === "object" &&
        "toNumber" in purchase.totalPrice
          ? purchase.totalPrice.toNumber()
          : Number(purchase.totalPrice),
      PurchaseItem: purchase.PurchaseItem.map((item) => ({
        ...item,
        price:
          typeof item.price === "object" && "toNumber" in item.price
            ? item.price.toNumber()
            : Number(item.price),
      })),
    });

    if (!pdfBuffer) {
      return NextResponse.json(
        { error: "Failed to generate invoice PDF" },
        { status: 500 },
      );
    }

    const download = req.nextUrl.searchParams.get("download") === "true";
    const email = req.nextUrl.searchParams.get("email") === "true";

    if (email && user.email) {
      const filename = `invoice-${invoice.invoiceNumber}.pdf`;
      await sendInvoiceEmail({
        toEmail: user.email,
        pdfBuffer,
        filename,
        purchase: { ...purchase, invoiceNumber: invoice.invoiceNumber },
      });

      return NextResponse.json({
        success: true,
        message: "Invoice sent to your email",
      });
    }

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="invoice-${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
