import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  // Get the URL parameter from the search params
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  // Validate URL
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Fetch the raw file content
    const response = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    });

    // Return the response with CORS headers
    return new NextResponse(new Blob([response.data]), {
      status: 200,
      headers: {
        "Content-Type": response.headers["content-type"] || "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);

    // More detailed error handling
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: "Failed to fetch component",
          details: error.response?.data || error.message,
        },
        {
          status: error.response?.status || 500,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Unexpected error occurred",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
