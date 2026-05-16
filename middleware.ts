import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { Role } from "@prisma/client"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const role = token?.role as Role | undefined

    // ── Admin routes ──────────────────────────
    if (pathname.startsWith("/admin") && role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // ── Vendor routes ─────────────────────────
    if (
      pathname.startsWith("/vendor/dashboard") &&
      role !== Role.VENDOR &&
      role !== Role.ADMIN
    ) {
      return NextResponse.redirect(new URL("/vendor/apply", req.url))
    }

    // ── Member-only routes ────────────────────
    if (
      pathname.startsWith("/membership/card") &&
      role !== Role.MEMBER &&
      role !== Role.ADMIN
    ) {
      return NextResponse.redirect(new URL("/membership", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes — no auth required
        const publicRoutes = [
          "/",
          "/login",
          "/register",
          "/vendors",
          "/events",
          "/packages",
          "/membership",
          "/nominations",
          "/giveaway",
          "/faq",
          "/blog",
          "/api/auth",
          "/api/webhooks",
          "/verify",
        ]

        const isPublic = publicRoutes.some((route) =>
          pathname.startsWith(route)
        )

        if (isPublic) return true

        // All other routes require auth
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
}
