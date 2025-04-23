import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { PRICING } from "@/lib/config";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Redirect to login if not authenticated
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if the route requires a subscription
  const requiresSubscription = request.nextUrl.pathname.startsWith("/pro");

  if (requiresSubscription) {
    try {
      // Check subscription status
      const response = await fetch(
        new URL("/api/subscription/current", request.url),
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        }
      );

      const { subscription } = await response.json();

      // If no active subscription, redirect to pricing page
      if (!subscription || subscription.status !== "active") {
        return NextResponse.redirect(new URL("/pricing", request.url));
      }

      // Check if the subscription plan has access to the requested feature
      const plan = Object.entries(PRICING).find(
        ([_, p]) => p.name === subscription.plan
      )?.[1];

      if (!plan?.features.includes("Pro Features")) {
        return NextResponse.redirect(new URL("/pricing", request.url));
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pro/:path*",
    "/settings/:path*",
    "/api/pro/:path*",
  ],
}; 