import { db } from '@/lib/db'
import { PLAN_RANK } from '@/lib/plans'

export const LISTED_PLANS = ['STARTER', 'COMMUNITY', 'PREMIUM'] as const

// Card-sized data that is safe to pass to client components.
export type BusinessCardData = {
  id: string
  name: string
  slug: string
  blurb: string
  photo: string | null
  plan: string
  foundingMember: boolean
  category: { name: string; slug: string; icon: string | null }
  deal: { title: string; memberOnly: boolean } | null
}

const cardInclude = { category: true, deal: true } as const

function toCard(v: any, canSeeDeals: boolean): BusinessCardData {
  const deal = v.deal && v.deal.isActive ? v.deal : null
  return {
    id: v.id,
    name: v.name,
    slug: v.slug,
    blurb: v.tagline || v.description || '',
    photo: v.photos?.[0] ?? null,
    plan: v.plan,
    foundingMember: v.foundingMember,
    category: { name: v.category.name, slug: v.category.slug, icon: v.category.icon },
    // Hide member-only deal text from people who have not paid.
    deal: deal ? { title: deal.memberOnly && !canSeeDeals ? '' : deal.title, memberOnly: deal.memberOnly } : null,
  }
}

function byPlacement(a: any, b: any) {
  return (PLAN_RANK[b.plan] - PLAN_RANK[a.plan]) || (b.priority - a.priority) || a.name.localeCompare(b.name)
}

export async function getListedBusinesses(canSeeDeals: boolean, where: Record<string, any> = {}) {
  const vendors = await db.vendor.findMany({
    where: { status: 'ACTIVE', plan: { in: [...LISTED_PLANS] }, ...where },
    include: cardInclude,
  })
  return vendors.sort(byPlacement).map(v => toCard(v, canSeeDeals))
}

// Homepage spotlight: rotates Premium businesses on every visit, topped up with Community ones.
export async function getSpotlightBusinesses(canSeeDeals: boolean, count = 4) {
  const vendors = await db.vendor.findMany({
    where: { status: 'ACTIVE', plan: { in: ['PREMIUM', 'COMMUNITY'] } },
    include: cardInclude,
  })
  const shuffle = <T,>(arr: T[]) => arr.map(x => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map(x => x[1])
  const premium = shuffle(vendors.filter(v => v.plan === 'PREMIUM'))
  const community = shuffle(vendors.filter(v => v.plan === 'COMMUNITY'))
  return [...premium, ...community].slice(0, count).map(v => toCard(v, canSeeDeals))
}
