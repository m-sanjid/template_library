import { NextRequest, NextResponse } from "next/server";
import { COMPONENTS } from "@/data/components";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    console.log("Received request for component ID:", id);

    // Find the component in our static data
    const component = COMPONENTS.find(c => c.id === id);

    if (!component) {
      return NextResponse.json(
        {
          error: true,
          message: `Component with ID ${id} not found`,
          availableIds: COMPONENTS.map((c) => c.id),
        },
        { status: 404 },
      );
    }

    return NextResponse.json(component, { status: 200 });
  } catch (error) {
    console.error("Error in component fetching route:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 },
    );
  }
}
