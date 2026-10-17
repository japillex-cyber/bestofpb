import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Admin pages require an admin login. (Admin APIs also check this on the server.)
// Note: this file must live in src/ to take effect, because the app lives in src/app.
//
// The session cookie is named "__Secure-next-auth.session-token" on https and
// "next-auth.session-token" on http. We pick the name from the actual request
// instead of NEXTAUTH_URL, so a stale NEXTAUTH_URL (e.g. http://localhost:3000
// on Vercel) can't make the guard miss the cookie and bounce admins to /login.
export async function middleware(req: NextRequest) {
  const secureCookie = req.nextUrl.protocol === 'https:'
  let token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie })
  // Fallback: try the other cookie name too.
  if (!token) token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: !secureCookie })

  if (token?.role === 'ADMIN') return NextResponse.next()

  const login = new URL('/login', req.url)
  login.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/admin/:path*'],
}
