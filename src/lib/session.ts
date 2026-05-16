import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Role } from "@prisma/client"

// ─────────────────────────────────────────────
// Get current session (server components)
// ─────────────────────────────────────────────

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user ?? null
}

// ─────────────────────────────────────────────
// Route guards (use in server components/layouts)
// ─────────────────────────────────────────────

export async function requireAuth(redirectTo = "/login") {
  const user = await getCurrentUser()
  if (!user) redirect(redirectTo)
  return user
}

export async function requireMember() {
  const user = await requireAuth()
  if (user.role !== Role.MEMBER && user.role !== Role.ADMIN) {
    redirect("/membership")
  }
  return user
}

export async function requireVendor() {
  const user = await requireAuth()
  if (user.role !== Role.VENDOR && user.role !== Role.ADMIN) {
    redirect("/vendor/apply")
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== Role.ADMIN) {
    redirect("/")
  }
  return user
}

// ─────────────────────────────────────────────
// Role checks
// ─────────────────────────────────────────────

export function isAdmin(role: Role) {
  return role === Role.ADMIN
}

export function isMember(role: Role) {
  return role === Role.MEMBER || role === Role.ADMIN
}

export function isVendor(role: Role) {
  return role === Role.VENDOR || role === Role.ADMIN
}

export function canAccessMemberContent(role: Role) {
  return [Role.MEMBER, Role.VENDOR, Role.ADMIN].includes(role)
}
