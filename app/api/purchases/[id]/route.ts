import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the purchase ID from the URL params
    const purchaseId = req.nextUrl.pathname.split("/").pop();

    if (!purchaseId) {
      return NextResponse.json(
        { error: "Missing purchase ID" },
        { status: 400 },
      );
    }

    // Fetch the purchase
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: {
        PurchaseItem: true,
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 },
      );
    }

    // Verify the purchase belongs to the authenticated user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || purchase.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(purchase);
  } catch (error) {
    console.error("Error fetching purchase:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
