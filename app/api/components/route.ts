import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log("Attempting to fetch component with ID:", id);

    // First, log all existing components
    const allComponents = await prisma.components.findMany();
    console.log("All components in database:", allComponents);

    // Fetch single component by ID
    const component = await prisma.components.findUnique({
      where: { id },
    });

    console.log("Found component:", component);

    // Handle case where component is not found
    if (!component) {
      return NextResponse.json(
        {
          error: true,
          message: `Component with ID ${id} not found`,
          availableIds: allComponents.map((c) => c.id),
        },
        { status: 404 }
      );
    }

    return NextResponse.json(component, { status: 200 });
  } catch (error) {
    console.error("Error fetching component:", error);
    return NextResponse.json(
      { error: true, message: "Failed to fetch component" },
      { status: 500 }
    );
  }
}
