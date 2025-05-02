import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

// List of public routes that don't require authentication
const publicPaths = [
  "/",
  "/showcase",
  "/showcase/(.*)",
  "/contact",
  "/pricing",
  "/privacy-policy",
  "/terms-of-service",
  "/testimonial-form/(.*)",
  "/api/testimonial-tokens/(.*)",
  "/api/testimonials/embed",
  "/api/embed-script.js"
];

// Create public route matcher
const isPublicRoute = createRouteMatcher(publicPaths);

// Middleware to protect non-public routes with authentication
export default clerkMiddleware(async (auth, req) => {
  // Check if this is a public route
  const isPublic = isPublicRoute(req);
  
  // For non-public routes, require authentication
  if (!isPublic) {
    // For API routes, return JSON error response instead of redirecting
    if (req.url.includes("/api/")) {
      try {
        await auth.protect();
      } catch (_) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
    } else {
      // For browser routes, regular auth protection (redirects to sign-in)
      await auth.protect();
    }
  }

  // Rate limiting for public API endpoints
  if (req.url.includes("/api/") && isPublic) {
    // Add a basic rate limiting header - in production you'd use a proper solution
    const headers = new Headers(req.headers);
    headers.set("X-RateLimit-Limit", "100");
    headers.set("X-RateLimit-Remaining", "99");
    
    return NextResponse.next({
      headers
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};