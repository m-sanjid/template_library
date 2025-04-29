import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, email } = body;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
      },
      select: {
        name: true,
        email: true,
        image: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        provider: true,
        isAdmin: true,
      },
    });

    // Return updated settings
    const settings = {
      name: user.name || "",
      email: user.email || "",
      language: "en",
      theme: "system",
      emailNotifications: {
        newTemplates: true,
        updates: true,
        marketing: false,
      },
      pushNotifications: {
        browser: true,
        mobile: false,
      },
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 