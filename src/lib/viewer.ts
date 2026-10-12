import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// Who is looking at the page, read fresh from the database.
// The login session can hold an out-of-date role (e.g. right after paying),
// so membership is always checked against the database.
export async function getViewer() {
  const session = await getServerSession(authOptions)
  const id = (session?.user as any)?.id as string | undefined
  if (!id) return { user: null, isAdmin: false, isPaidMember: false, tier: null as string | null, vendor: null }

  const user = await db.user.findUnique({
    where: { id },
    include: { membership: true, vendor: true },
  })
  if (!user) return { user: null, isAdmin: false, isPaidMember: false, tier: null as string | null, vendor: null }

  const isAdmin = user.role === 'ADMIN'
  const m = user.membership
  const isPaidMember = isAdmin || (!!m && (m.status === 'ACTIVE' || m.status === 'TRIALING'))

  return {
    user,
    isAdmin,
    isPaidMember,
    tier: isPaidMember ? (m?.tier ?? (isAdmin ? 'VIP' : null)) : null,
    vendor: user.vendor,
  }
}

export async function requireAdminApi() {
  const v = await getViewer()
  return v.isAdmin ? v : null
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export async function uniqueVendorSlug(name: string, excludeId?: string) {
  const base = slugify(name) || 'business'
  let slug = base
  for (let i = 2; ; i++) {
    const hit = await db.vendor.findUnique({ where: { slug } })
    if (!hit || hit.id === excludeId) return slug
    slug = `${base}-${i}`
  }
}
