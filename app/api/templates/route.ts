import { NextRequest } from "next/server";
import TEMPLATES from "@/lib/templates";

export async function GET(request: NextRequest) {
    try {
      const templates = TEMPLATES;
      console.log("Templates data:", templates);
      return new Response(JSON.stringify(templates), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("API error:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch templates" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }