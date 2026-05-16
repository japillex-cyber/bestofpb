'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const PACKAGES: Record<string, any> = {
  'pb-bachelorette-ultimate': {
    title: 'Ultimate Bachelorette Package',
    catLabel: 'Bachelorette', catColor: '#FF6B9D',
    desc: "The perfect send-off for the bride-to-be. We've curated the ultimate full-day Pacific Beach bachelorette experience — from morning pampering to late-night dancing. Everything is handled for you so you can focus on celebrating.",
    pricePerPerson: 149, minGroup: 4, maxGroup: 15,
    duration: 'Full day (10am–2am)',
    spots: 8,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=1200&q=80',
    includes: ['Spa & nail session at Glow Beauty Bar (2hrs)','VIP rooftop dinner at Wave Lounge (reserved table)','Sunset boat cruise on the bay (1.5hrs)','Bar crawl with VIP entry to 4 venues','Custom sash & accessories kit for the whole group','Professional event coordinator','Welcome champagne toast'],
    itinerary: [
      { time: '10:00 AM', activity: 'Meet at Glow Beauty Bar', detail: 'Welcome mimosas + full spa & nail session for the group' },
      { time: '1:00 PM', activity: 'Beachside lunch', detail: 'Reserved table at Shore House Kitchen on the water' },
      { time: '3:00 PM', activity: 'Sunset boat cruise', detail: '1.5 hour bay cruise with drinks and music' },
      { time: '5:30 PM', activity: 'Get ready break', detail: 'Check in to The Bungalow Hotel to freshen up (optional add-on)' },
      { time: '7:00 PM', activity: 'VIP dinner at Wave Lounge', detail: 'Reserved rooftop table, 3-course menu, sunset views' },
      { time: '9:30 PM', activity: 'PB Bar Crawl begins', detail: 'VIP entry to 4 of PB\'s hottest venues with drink specials' },
    ],
    excludes: ['Hotel accommodation (optional add-on)','Personal drinks beyond included credits','Transportation to/from PB'],
    badge: '🔥 Most Popular',
  },
  'pb-bar-crawl': {
    title: 'PB Bar Crawl Night',
    catLabel: 'Bar Crawl', catColor: '#8B5CF6',
    desc: "Hit the best bars in Pacific Beach in one legendary night. Your BOPB crawl guide leads the way — VIP entry, exclusive drink specials, and an unforgettable night with your crew.",
    pricePerPerson: 45, minGroup: 1, maxGroup: 50,
    duration: 'Evening (8pm–2am)',
    spots: 30,
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=1200&q=80',
    includes: ['VIP entry to 5 top PB bars','Welcome shot at each venue','Exclusive drink specials all night','Official BOPB crawl wristband','Professional crawl guide','Group photo at each stop'],
    itinerary: [
      { time: '8:00 PM', activity: 'Meeting point — Garnet Ave', detail: 'Meet your guide, get your wristband and welcome shot' },
      { time: '8:30 PM', activity: 'Stop 1 — Craft & Pint', detail: 'Craft beer specials and the famous $5 shot wall' },
      { time: '9:15 PM', activity: 'Stop 2 — The Backyard', detail: 'Outdoor bar with live DJ and $6 cocktails for crawlers' },
      { time: '10:00 PM', activity: 'Stop 3 — Pacific Beach Bar', detail: 'PB\'s most iconic beach bar, front row ocean views' },
      { time: '10:45 PM', activity: 'Stop 4 — Firefly', detail: 'Rooftop bar with panoramic PB views' },
      { time: '11:30 PM', activity: 'Stop 5 — Wave Lounge', detail: 'Finish at PB\'s hottest venue with VIP access' },
    ],
    excludes: ['Personal drinks beyond included specials','Food','Transportation'],
    badge: '🆕 New',
  },
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = PACKAGES[params.slug]
  const [groupSize, setGroupSize] = useState(pkg?.minGroup ?? 4)
  const [loading, setLoading] = useState(false)

  if (!pkg) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 52 }}>📦</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 700 }}>Package not found</h2>
          <Link href="/packages" className="btn btn-primary btn-md">Back to Packages</Link>
        </div>
        <Footer />
      </>
    )
  }

  const totalPrice = pkg.pricePerPerson * groupSize

  const handleBook = async () => {
    setLoading(true)
    setTimeout(() => {
      alert(`Booking coming soon! Total: $${totalPrice} for ${groupSize} people`)
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <Navbar />

      {/* Hero image */}
      <div style={{ height: 420, position: 'relative', marginTop: 'var(--nav-height)', overflow: 'hidden' }}>
        <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,9,28,0.3) 0%, rgba(4,9,28,0.7) 100%)' }} />
        <div className="container" style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Link href="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 16, textDecoration: 'none' }}>← Back to Packages</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ background: pkg.catColor, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 999 }}>{pkg.catLabel}</span>
            {pkg.badge && <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{pkg.badge}</span>}
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{pkg.title}</h1>
          <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>⏱️ {pkg.duration}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>👥 {pkg.minGroup}–{pkg.maxGroup} people</span>
            <span style={{ fontSize: 13, color: pkg.spots <= 5 ? '#FCA5A5' : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>
              {pkg.spots <= 5 ? `🔥 Only ${pkg.spots} spots left!` : `✅ ${pkg.spots} spots available`}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: 'var(--gray-50)', paddingBottom: 80 }}>
        <div className="container" style={{ paddingTop: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }}>

            {/* Left — details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* About */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>About this package</h2>
                <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8 }}>{pkg.desc}</p>
              </div>

              {/* What's included */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 18 }}>What's included</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {pkg.includes.map((item: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#E8F5EE', color: '#0B7A4B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-100)' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 8 }}>Not included:</p>
                  {pkg.excludes.map((item: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 14, color: 'var(--gray-400)' }}>✕</span>
                      <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Your itinerary</h2>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'var(--gray-100)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {pkg.itinerary.map((item: any, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, zIndex: 1 }}>{i+1}</div>
                        <div style={{ paddingTop: 8 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.5px', marginBottom: 3 }}>{item.time}</div>
                          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 3 }}>{item.activity}</div>
                          <div style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.5 }}>{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — booking card */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 20px)', alignSelf: 'flex-start' }}>
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 26, boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>from</span>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-1px' }}>${pkg.pricePerPerson}</span>
                  <span style={{ fontSize: 14, color: 'var(--gray-400)' }}>/ person</span>
                </div>

                {/* Group size selector */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Group Size</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--gray-50)', border: '1.5px solid var(--gray-200)', borderRadius: 12, padding: '10px 16px' }}>
                    <button onClick={() => setGroupSize(Math.max(pkg.minGroup, groupSize - 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1.5px solid var(--gray-200)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', color: 'var(--gray-700)' }}>−</button>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--gray-900)' }}>{groupSize}</span>
                      <span style={{ fontSize: 13, color: 'var(--gray-400)', marginLeft: 6 }}>people</span>
                    </div>
                    <button onClick={() => setGroupSize(Math.min(pkg.maxGroup, groupSize + 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1.5px solid var(--gray-200)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', color: 'var(--gray-700)' }}>+</button>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6 }}>Capacity: {pkg.minGroup}–{pkg.maxGroup} people</p>
                </div>

                {/* Total */}
                <div style={{ background: 'var(--blue-light)', borderRadius: 12, padding: '14px 16px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)' }}>Total for {groupSize} people</span>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--blue)' }}>${totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleBook}
                  disabled={loading}
                  style={{ width: '100%', height: 52, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginBottom: 12, opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Processing...' : 'Book Now 🎉'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.5 }}>No charge today. We'll confirm details and process payment within 24 hours.</p>

                <div style={{ borderTop: '1px solid var(--gray-100)', marginTop: 18, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['✅','Free cancellation (48hrs notice)'],['📅','Flexible date scheduling'],['💬','24/7 BOPB support']].map(([icon, text]) => (
                    <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray-500)' }}>
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
