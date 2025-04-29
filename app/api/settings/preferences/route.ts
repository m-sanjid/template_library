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
    const { language, theme, emailNotifications, pushNotifications } = body;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        updatedAt: new Date(),
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
      language: language || "en",
      theme: theme || "system",
      emailNotifications: {
        newTemplates: emailNotifications?.newTemplates ?? true,
        updates: emailNotifications?.updates ?? true,
        marketing: emailNotifications?.marketing ?? false,
      },
      pushNotifications: {
        browser: pushNotifications?.browser ?? true,
        mobile: pushNotifications?.mobile ?? false,
      },
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 