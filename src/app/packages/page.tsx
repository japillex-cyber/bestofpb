'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CATEGORIES = [
  { slug: 'all',         label: 'All Packages',    icon: '🎊' },
  { slug: 'bachelorette',label: 'Bachelorette',    icon: '👰' },
  { slug: 'bachelor',    label: 'Bachelor',         icon: '🤵' },
  { slug: 'birthday',    label: 'Birthday',         icon: '🎂' },
  { slug: 'barcrawl',    label: 'Bar Crawl',        icon: '🍺' },
  { slug: 'weekend',     label: 'Weekend Getaway',  icon: '🏄' },
  { slug: 'staycation',  label: 'Staycation',       icon: '🏨' },
  { slug: 'holiday',     label: 'Holiday',          icon: '🎄' },
  { slug: 'valentines',  label: "Valentine's",      icon: '❤️' },
]

const PACKAGES = [
  {
    id: '1', slug: 'pb-bachelorette-ultimate',
    title: 'Ultimate Bachelorette Package',
    category: 'bachelorette', catLabel: 'Bachelorette', catColor: '#FF6B9D',
    desc: 'The perfect send-off for the bride-to-be. Full day of pampering, drinks, dinner, and dancing across the best spots in PB.',
    pricePerPerson: 149, minGroup: 4, maxGroup: 15,
    includes: ['Spa & nail session at Glow Beauty Bar','VIP rooftop dinner at Wave Lounge','Sunset boat cruise on the bay','Bar crawl with VIP entry to 4 venues','Custom sash & accessories kit'],
    images: ['https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&q=70'],
    spots: 8, duration: 'Full day (10am–2am)',
    badge: '🔥 Most Popular',
  },
  {
    id: '2', slug: 'pb-birthday-vip',
    title: 'VIP Birthday Experience',
    category: 'birthday', catLabel: 'Birthday', catColor: '#F59E0B',
    desc: 'Make your birthday unforgettable in Pacific Beach. VIP treatment all day — from brunch to nightlife.',
    pricePerPerson: 89, minGroup: 2, maxGroup: 20,
    includes: ['VIP brunch at Shore House Kitchen','$50 activity credit (paddle, bike, surf)','Dinner reservation with priority seating','VIP nightlife access at 2 venues','Birthday cake & decorations'],
    images: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=70'],
    spots: 12, duration: '12 hours (11am–11pm)',
    badge: null,
  },
  {
    id: '3', slug: 'pb-bar-crawl',
    title: 'PB Bar Crawl Night',
    category: 'barcrawl', catLabel: 'Bar Crawl', catColor: '#8B5CF6',
    desc: 'Hit the best bars in Pacific Beach with VIP entry, drink specials, and your own BOPB crawl guide.',
    pricePerPerson: 45, minGroup: 1, maxGroup: 50,
    includes: ['VIP entry to 5 top PB bars','Welcome shot at each venue','Exclusive drink specials all night','Official BOPB crawl wristband','Professional crawl guide'],
    images: ['https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600&q=70'],
    spots: 30, duration: 'Evening (8pm–2am)',
    badge: '🆕 New',
  },
  {
    id: '4', slug: 'pb-weekend-surf-getaway',
    title: 'Weekend Surf Getaway',
    category: 'weekend', catLabel: 'Weekend Getaway', catColor: '#06B6D4',
    desc: 'The ultimate PB weekend — surf lessons, beach bonfires, farm-to-table dining, and a boutique hotel stay.',
    pricePerPerson: 299, minGroup: 2, maxGroup: 8,
    includes: ['2 nights at The Bungalow Hotel','Surf lessons with pro instructor','Beachside bonfire setup','Farm-to-table dinner for 2','Paddleboard rental (2 hours)'],
    images: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=70'],
    spots: 4, duration: '2 nights / 3 days',
    badge: '⭐ Premium',
  },
  {
    id: '5', slug: 'pb-bachelor-party',
    title: 'Epic Bachelor Package',
    category: 'bachelor', catLabel: 'Bachelor', catColor: '#3B82F6',
    desc: "The ultimate guys' weekend in PB. Deep sea fishing, beach games, steakhouse dinner, and VIP nightlife.",
    pricePerPerson: 199, minGroup: 4, maxGroup: 12,
    includes: ['Half-day deep sea fishing charter','Beach Olympics setup & equipment','VIP steakhouse dinner reservation','Nightlife VIP entry to 3 venues','Custom groom gear & decorations'],
    images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=70'],
    spots: 6, duration: 'Full day (7am–2am)',
    badge: null,
  },
  {
    id: '6', slug: 'pb-staycation',
    title: 'PB Staycation Package',
    category: 'staycation', catLabel: 'Staycation', catColor: '#10B981',
    desc: 'Recharge without leaving Pacific Beach. Spa, yoga, amazing food, and total relaxation.',
    pricePerPerson: 179, minGroup: 1, maxGroup: 4,
    includes: ['2-night boutique hotel stay','Full spa day at Glow Beauty Bar','Morning yoga on the beach','3 restaurant reservations','$100 dining credit'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70'],
    spots: 10, duration: '2 nights / 3 days',
    badge: null,
  },
  {
    id: '7', slug: 'pb-valentines',
    title: "Valentine's Romance Package",
    category: 'valentines', catLabel: "Valentine's", catColor: '#EC4899',
    desc: 'The most romantic evening in Pacific Beach. Sunset cruise, fine dining, and a luxe hotel night.',
    pricePerPerson: 249, minGroup: 2, maxGroup: 2,
    includes: ['Sunset champagne cruise','Fine dining reservation (oceanfront)','Luxury hotel room with rose setup','Couples massage','Breakfast in bed next morning'],
    images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=70'],
    spots: 5, duration: '1 night (5pm–11am next day)',
    badge: '❤️ Romantic',
  },
  {
    id: '8', slug: 'pb-holiday-party',
    title: 'Holiday Party Package',
    category: 'holiday', catLabel: 'Holiday', catColor: '#EF4444',
    desc: 'Make your holiday party legendary in PB. Private venue, open bar, catering, and all the festive extras.',
    pricePerPerson: 129, minGroup: 10, maxGroup: 50,
    includes: ['Private venue for up to 50 guests','3-hour open bar','Holiday buffet catering','DJ and dance floor','Professional photos & decorations'],
    images: ['https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&q=70'],
    spots: 3, duration: '4 hours (flexible timing)',
    badge: '🎄 Seasonal',
  },
]

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [groupSize, setGroupSize] = useState(4)

  const filtered = PACKAGES.filter(p =>
    activeCategory === 'all' || p.category === activeCategory
  )

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 24px 48px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Curated Experiences</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,5vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
            PB Experience Packages
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Bachelorettes, birthdays, bar crawls, and more — all curated by the BOPB team for the ultimate Pacific Beach experience.
          </p>

          {/* Group size slider */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '14px 24px' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Group size:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setGroupSize(Math.max(1, groupSize - 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>−</button>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: '#fff', minWidth: 32, textAlign: 'center' }}>{groupSize}</span>
              <button onClick={() => setGroupSize(Math.min(50, groupSize + 1))} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>+</button>
            </div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>people</span>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
              {CATEGORIES.map(cat => (
                <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, border: 'none', background: activeCategory === cat.slug ? '#0057FF' : 'rgba(255,255,255,0.06)', color: activeCategory === cat.slug ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Packages grid */}
      <div style={{ background: 'var(--gray-50)', padding: '40px 0 80px' }}>
        <div className="container">
          <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28 }}>
            <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> packages available
            {activeCategory !== 'all' && ` · ${CATEGORIES.find(c => c.slug === activeCategory)?.label}`}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} groupSize={groupSize} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🏖️</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 14, letterSpacing: '-0.5px' }}>Want something custom?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Contact us and we'll build a custom PB experience package just for your group.
          </p>
          <Link href="/contact" className="btn btn-primary btn-xl">Build a Custom Package</Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

function PackageCard({ pkg, groupSize, index }: { pkg: typeof PACKAGES[0], groupSize: number, index: number }) {
  const totalPrice = pkg.pricePerPerson * groupSize
  const fits = groupSize >= pkg.minGroup && groupSize <= pkg.maxGroup
  const almostGone = pkg.spots <= 5

  return (
    <Link href={`/packages/${pkg.slug}`} style={{ display: 'block', borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease', animation: `fadeUp 0.5s ease ${index * 70}ms both` }}>
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--gray-100)' }}>
        <img src={pkg.images[0]} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(4,9,28,0.55) 100%)' }} />

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 14, left: 14, background: pkg.catColor, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, letterSpacing: '0.3px' }}>
          {pkg.catLabel}
        </div>

        {/* Popular badge */}
        {pkg.badge && (
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
            {pkg.badge}
          </div>
        )}

        {/* Spots left */}
        {almostGone && (
          <div style={{ position: 'absolute', bottom: 14, right: 14, background: '#FEE2E2', color: '#B91C1C', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
            Only {pkg.spots} spots left!
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 7, letterSpacing: '-0.2px', lineHeight: 1.25 }}>{pkg.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.desc}</p>

        {/* Includes */}
        <div style={{ marginBottom: 14 }}>
          {pkg.includes.slice(0, 3).map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#E8F5EE', color: '#0B7A4B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 12.5, color: 'var(--gray-600)' }}>{item}</span>
            </div>
          ))}
          {pkg.includes.length > 3 && (
            <span style={{ fontSize: 12, color: 'var(--gray-400)', paddingLeft: 23 }}>+{pkg.includes.length - 3} more included</span>
          )}
        </div>

        {/* Group size & duration */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: fits ? 'var(--gray-500)' : '#B91C1C', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
            👥 {pkg.minGroup}–{pkg.maxGroup} people
            {!fits && <span style={{ fontWeight: 700 }}> (adjust group)</span>}
          </span>
          <span style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
            ⏱️ {pkg.duration}
          </span>
        </div>

        {/* Price */}
        <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>from</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>${pkg.pricePerPerson}</span>
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>/ person</span>
            </div>
            {fits && (
              <div style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>
                ${totalPrice.toLocaleString()} total for {groupSize} people
              </div>
            )}
          </div>
          <div style={{ background: 'var(--blue)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 10 }}>
            Book Now →
          </div>
        </div>
      </div>
    </Link>
  )
}
