import { db } from '@/lib/db'
import { GUIDES } from '@/lib/plans'
import { normalizeInstagramUrl } from '@/lib/instagram'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const PLANS = ['FREE', 'STARTER', 'COMMUNITY', 'PREMIUM']
const STATUSES = ['PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE']

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const opt = (v: unknown, max = 500) => str(v, max) || null

function lines(v: unknown): string[] {
  const arr = Array.isArray(v) ? v : typeof v === 'string' ? v.split(/\r?\n/) : []
  return Array.from(new Set(arr.map(x => String(x).trim()).filter(Boolean)))
}

function url(v: unknown) {
  const s = str(v, 1000)
  if (!s) return null
  return /^https?:\/\//i.test(s) ? s : `https://${s}`
}

// Fields a business owner may edit about themselves.
export function ownerFields(body: any) {
  const hours: Record<string, string> = {}
  for (const d of DAYS) { const h = str(body?.hours?.[d], 60); if (h) hours[d] = h }
  return {
    tagline: opt(body.tagline, 140),
    description: opt(body.description, 5000),
    neighborhood: opt(body.neighborhood, 80),
    address: opt(body.address, 200),
    city: opt(body.city, 80),
    state: opt(body.state, 40),
    zip: opt(body.zip, 20),
    phone: opt(body.phone, 40),
    email: opt(body.email, 200),
    website: url(body.website),
    instagramHandle: opt(body.instagramHandle, 80),
    bookingUrl: url(body.bookingUrl),
    reservationUrl: url(body.reservationUrl),
    orderUrl: url(body.orderUrl),
    mapsUrl: url(body.mapsUrl),
    hours,
    photos: lines(body.photos).slice(0, 20),
    logoUrl: url(body.logoUrl),
  }
}

// Everything, for admins.
export function adminFields(body: any) {
  const plan = PLANS.includes(body.plan) ? body.plan : undefined
  const status = STATUSES.includes(body.status) ? body.status : undefined
  const igPosts = lines(body.instagramPosts).map(u => normalizeInstagramUrl(u)).filter((u): u is string => !!u)
  const guideSlugs = GUIDES.map(g => g.slug)
  return {
    ...ownerFields(body),
    name: str(body.name, 120),
    categoryId: str(body.categoryId, 60),
    instagramPosts: Array.from(new Set(igPosts)).slice(0, 24),
    guides: lines(body.guides).filter(g => guideSlugs.includes(g)),
    priority: Number.isFinite(Number(body.priority)) ? Math.round(Number(body.priority)) : 0,
    foundingMember: !!body.foundingMember,
    ...(plan ? { plan } : {}),
    ...(status ? { status } : {}),
  }
}

// Creates, updates or removes the business's special.
export async function saveDeal(vendorId: string, deal: any) {
  if (deal === undefined) return
  const title = str(deal?.title, 120)
  if (!title) {
    await db.deal.deleteMany({ where: { vendorId } })
    return
  }
  const data = {
    title,
    description: str(deal.description, 1000) || title,
    terms: opt(deal.terms, 500),
    imageUrl: url(deal.imageUrl),
    memberOnly: deal.memberOnly !== false,
    isActive: deal.isActive !== false,
  }
  await db.deal.upsert({ where: { vendorId }, create: { vendorId, ...data }, update: data })
}
