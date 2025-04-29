import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
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

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Default settings if not set
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
    console.error("Error fetching settings:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 
 