import { withAuth } from 'next-auth/middleware'

// Admin pages require an admin login. (Admin APIs also check this on the server.)
// Note: this file must live in src/ to take effect, because the app lives in src/app.
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === 'ADMIN',
  },
  pages: { signIn: '/login' },
})

export const config = {
  matcher: ['/admin/:path*'],
}
