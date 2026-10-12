import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import InstagramEmbed from '@/components/InstagramEmbed'
import { LocalsLoveBadge } from '@/components/vendor/BusinessCard'
import { db } from '@/lib/db'
import { getViewer } from '@/lib/viewer'
import { hasLocalsLoveBadge, GUIDES } from '@/lib/plans'
import { LISTED_PLANS } from '@/lib/vendors'

export const dynamic = 'force-dynamic'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const card: React.CSSProperties = { background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 26 }
const h2: React.CSSProperties = { fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 16 }

async function loadVendor(slug: string) {
  return db.vendor.findUnique({
    where: { slug },
    include: {
      category: true,
      deal: true,
      events: { where: { status: 'APPROVED', startDate: { gte: new Date() } }, orderBy: { startDate: 'asc' }, take: 6 },
    },
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = await db.vendor.findUnique({ where: { slug: params.slug }, select: { name: true, tagline: true, description: true, photos: true, status: true, plan: true } })
  if (!v || v.status !== 'ACTIVE' || v.plan === 'FREE') return { title: 'Business not found — Best of PB' }
  const description = (v.tagline || v.description || `${v.name} in San Diego`).slice(0, 160)
  return {
    title: `${v.name} — Best of PB San Diego`,
    description,
    openGraph: { title: v.name, description, images: v.photos[0] ? [v.photos[0]] : [] },
  }
}

function externalUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

function igHandle(raw: string) {
  return raw.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/.*$/, '')
}

export default async function BusinessPage({ params }: { params: { slug: string } }) {
  const [vendor, viewer] = await Promise.all([loadVendor(params.slug), getViewer()])
  if (!vendor) notFound()

  const isOwner = !!viewer.user && vendor.userId === viewer.user.id
  const isPublic = vendor.status === 'ACTIVE' && (LISTED_PLANS as readonly string[]).includes(vendor.plan)
  if (!isPublic && !viewer.isAdmin && !isOwner) notFound()

  const deal = vendor.deal && vendor.deal.isActive ? vendor.deal : null
  const dealLocked = !!deal && deal.memberOnly && !viewer.isPaidMember
  const hours = (vendor.hours ?? {}) as Record<string, string>
  const hasHours = DAYS.some(d => hours[d])
  const handle = vendor.instagramHandle ? igHandle(vendor.instagramHandle) : null
  const mapsUrl = vendor.mapsUrl || (vendor.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([vendor.name, vendor.address, vendor.city, vendor.state].filter(Boolean).join(', '))}` : null)
  const fullAddress = [vendor.address, [vendor.city, vendor.state].filter(Boolean).join(', '), vendor.zip].filter(Boolean).join(' · ')
  const guides = GUIDES.filter(g => vendor.guides.includes(g.slug))

  const actions = [
    vendor.bookingUrl && { label: 'Book now', href: vendor.bookingUrl, primary: true },
    vendor.reservationUrl && { label: 'Reserve a table', href: vendor.reservationUrl, primary: !vendor.bookingUrl },
    vendor.orderUrl && { label: 'Order online', href: vendor.orderUrl, primary: false },
    mapsUrl && { label: 'Directions', href: mapsUrl, primary: false },
    vendor.website && { label: 'Website', href: vendor.website, primary: false },
    handle && { label: `@${handle}`, href: `https://www.instagram.com/${handle}/`, primary: false },
  ].filter(Boolean) as { label: string; href: string; primary: boolean }[]

  return (
    <>
      <Navbar />

      {!isPublic && (
        <div style={{ marginTop: 'var(--nav-height)', background: '#FEF3C7', color: '#92400E', fontSize: 13, fontWeight: 600, padding: '10px 16px', textAlign: 'center' }}>
          Preview only — this page is not public yet{vendor.plan === 'FREE' ? '. Choose a paid plan to go live.' : ` (status: ${vendor.status.toLowerCase()}).`}
        </div>
      )}

      <div style={{ minHeight: 340, background: vendor.photos[0] ? `#0b2d60 url("${vendor.photos[0]}") center/cover` : 'linear-gradient(145deg,#0b2d60,#1557c0)', position: 'relative', marginTop: isPublic ? 'var(--nav-height)' : 0, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 40, paddingBottom: 32 }}>
          <Link href="/shop-local" style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600, marginBottom: 18, textDecoration: 'none' }}>← Back to Shop Local</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>
              {vendor.category.icon} {vendor.category.name}
            </span>
            {hasLocalsLoveBadge(vendor.plan) && <LocalsLoveBadge size="md" />}
            {vendor.plan === 'PREMIUM' && <span style={{ background: '#C8962A', color: '#fff', fontSize: 11, fontWeight: 800, padding: '5px 12px', borderRadius: 999, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Local Partner</span>}
            {vendor.foundingMember && <span style={{ background: 'rgba(255,255,255,0.9)', color: '#0D1020', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999 }}>Founding Partner</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {vendor.logoUrl && <img src={vendor.logoUrl} alt="" style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', background: '#fff', border: '2px solid rgba(255,255,255,0.6)' }} />}
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{vendor.name}</h1>
          </div>
          {(vendor.tagline || vendor.neighborhood) && (
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
              {vendor.tagline}{vendor.tagline && vendor.neighborhood ? ' · ' : ''}{vendor.neighborhood && `📍 ${vendor.neighborhood}`}
            </p>
          )}
          {actions.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              {actions.map(a => (
                <a key={a.label} href={externalUrl(a.href)} target="_blank" rel="noopener noreferrer" style={{ background: a.primary ? '#0057FF' : 'rgba(255,255,255,0.14)', border: a.primary ? 'none' : '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '10px 16px', borderRadius: 10, textDecoration: 'none' }}>
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', paddingBottom: 80 }}>
        <div className="container" style={{ paddingTop: 32 }}>
          <div className="biz-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 26 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0 }}>
              {vendor.description && (
                <div style={card}>
                  <h2 style={h2}>About</h2>
                  {vendor.description.split(/\n\s*\n/).map((p, i) => (
                    <p key={i} style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.75, marginBottom: 12 }}>{p}</p>
                  ))}
                  {guides.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                      {guides.map(g => (
                        <Link key={g.slug} href={`/guides/${g.slug}`} style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', background: 'var(--gray-100)', color: 'var(--gray-700)', borderRadius: 999, textDecoration: 'none' }}>
                          {g.icon} Featured in {g.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {vendor.photos.length > 1 && (
                <div style={card}>
                  <h2 style={h2}>Photos</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
                    {vendor.photos.slice(1).map(src => (
                      <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                        <img src={src} alt={vendor.name} loading="lazy" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 12, display: 'block' }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {vendor.instagramPosts.length > 0 && (
                <div style={card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                    <h2 style={{ ...h2, marginBottom: 0 }}>As Featured on Our Instagram</h2>
                    {handle && (
                      <a href={`https://www.instagram.com/${handle}/`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}>Follow @{handle} →</a>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 16, alignItems: 'start' }}>
                    {vendor.instagramPosts.map(url => <InstagramEmbed key={url} url={url} />)}
                  </div>
                </div>
              )}

              {vendor.events.length > 0 && (
                <div style={card}>
                  <h2 style={h2}>Upcoming Events</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {vendor.events.map(e => (
                      <div key={e.id} style={{ display: 'flex', gap: 14, alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--gray-100)' }}>
                        <div style={{ width: 52, textAlign: 'center', background: 'var(--blue-light)', borderRadius: 10, padding: '6px 0', flexShrink: 0 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase' }}>{e.startDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'America/Los_Angeles' })}</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)' }}>{e.startDate.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'America/Los_Angeles' })}</div>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>{e.title}</div>
                          <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                            {e.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' })}{e.location ? ` · ${e.location}` : ''}{e.isFree ? ' · Free' : e.price ? ` · $${e.price}` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {deal && (
                <div style={{ background: 'var(--navy)', borderRadius: 18, padding: 24 }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 14 }}>
                    🏷️ {deal.memberOnly ? 'Member Special' : 'Special of the Month'}
                  </h3>
                  {dealLocked ? (
                    <>
                      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, marginBottom: 14, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                        🔒 This special is for SD Social Club members.
                      </div>
                      <Link href="/memberships" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>Join the SD Social Club</Link>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10, textAlign: 'center' }}>First 3 months free</p>
                    </>
                  ) : (
                    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                      <p style={{ fontSize: 17, fontWeight: 800, color: '#60A5FA', marginBottom: 6 }}>{deal.title}</p>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{deal.description}</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>
                        {deal.memberOnly ? 'Show your SD Social Club card at checkout.' : 'Show this page at checkout to redeem.'}
                      </p>
                      {deal.terms && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>{deal.terms}</p>}
                    </div>
                  )}
                </div>
              )}

              {hasHours && (
                <div style={card}>
                  <h3 style={{ ...h2, fontSize: 17 }}>Hours</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {DAYS.map(day => (
                      <div key={day} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 9, borderBottom: '1px solid var(--gray-100)', fontSize: 14 }}>
                        <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>{day}</span>
                        <span style={{ color: !hours[day] || /closed/i.test(hours[day]) ? '#B91C1C' : 'var(--gray-600)' }}>{hours[day] || 'Closed'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={card}>
                <h3 style={{ ...h2, fontSize: 17 }}>Contact & Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14 }}>
                  {fullAddress && <InfoRow icon="📍" label={fullAddress} href={mapsUrl ?? undefined} />}
                  {vendor.phone && <InfoRow icon="📞" label={vendor.phone} href={`tel:${vendor.phone.replace(/[^\d+]/g, '')}`} />}
                  {vendor.email && <InfoRow icon="✉️" label={vendor.email} href={`mailto:${vendor.email}`} />}
                  {vendor.website && <InfoRow icon="🌐" label={vendor.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} href={externalUrl(vendor.website)} />}
                  {handle && <InfoRow icon="📸" label={`@${handle}`} href={`https://www.instagram.com/${handle}/`} />}
                </div>
              </div>

              <Link href="/shop-local" className="btn btn-ghost btn-md" style={{ justifyContent: 'center' }}>← Back to all businesses</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 860px) { .biz-grid { grid-template-columns: 1fr !important; } }`}</style>
      <Footer />
    </>
  )
}

function InfoRow({ icon, label, href }: { icon: string; label: string; href?: string }) {
  const content = <span style={{ color: href ? 'var(--blue)' : 'var(--gray-600)', lineHeight: 1.5, wordBreak: 'break-word' }}>{label}</span>
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a> : content}
    </div>
  )
}
