import { Role } from "@prisma/client"
import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: Role
    }
  }

  interface User {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}

// ─────────────────────────────────────────────
// Extend Prisma User type for auth
// ─────────────────────────────────────────────
declare module "@prisma/client" {
  interface User {
    password?: string | null
    stripeCustomerId?: string | null
  }
}
