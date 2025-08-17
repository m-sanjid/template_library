import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: req.body?.name,
        email: req.body?.email,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "Failed to update profile" });
  }
}
