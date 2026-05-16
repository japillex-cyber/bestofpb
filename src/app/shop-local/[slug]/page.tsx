'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const VENDORS: Record<string, any> = {
  'shore-house-kitchen': {
    name: 'Shore House Kitchen', catLabel: "I'm Hungry", catIcon: '🍽️',
    desc: 'Fresh coastal bites steps from the sand. Breakfast, brunch & lunch crafted from local ingredients daily. Our chefs source from local farms and fisheries to bring you the freshest Pacific Beach has to offer.',
    deal: '20% off your entire order', dealLocked: true,
    rating: 4.9, reviews: 128,
    address: '1234 Garnet Ave, Pacific Beach, CA 92109',
    phone: '(619) 555-0101', website: 'shorehousekitchen.com',
    instagram: '@shorehousepb', hours: { Mon:'7am–3pm', Tue:'7am–3pm', Wed:'7am–3pm', Thu:'7am–3pm', Fri:'7am–4pm', Sat:'7am–4pm', Sun:'7am–3pm' },
    color: 'linear-gradient(145deg,#0b2d60,#1557c0)',
    tags: ['Breakfast','Brunch','Lunch','Local Ingredients','Ocean View'],
  },
  'wave-lounge': {
    name: 'Wave Lounge', catLabel: 'PB Nights', catIcon: '🌙',
    desc: "PB's hottest rooftop bar with live music every weekend and panoramic ocean views. Craft cocktails, premium spirits, and the best sunset views in Pacific Beach. DJ nights every Friday and Saturday.",
    deal: 'Free entry + 2-for-1 cocktails', dealLocked: true,
    rating: 4.8, reviews: 94,
    address: '789 Mission Blvd, Pacific Beach, CA 92109',
    phone: '(619) 555-0202', website: 'waveloungepb.com',
    instagram: '@waveloungepb', hours: { Mon:'Closed', Tue:'Closed', Wed:'4pm–2am', Thu:'4pm–2am', Fri:'2pm–2am', Sat:'12pm–2am', Sun:'12pm–10pm' },
    color: 'linear-gradient(145deg,#170d35,#3b1e80)',
    tags: ['Rooftop Bar','Live Music','DJ','Cocktails','Ocean View'],
  },
}

export default function VendorPage({ params }: { params: { slug: string } }) {
  const vendor = VENDORS[params.slug]

  if (!vendor) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 52 }}>🏖️</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 700 }}>Business not found</h2>
          <Link href="/shop-local" className="btn btn-primary btn-md">Back to Shop Local</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <div style={{ height: 340, background: vendor.color, position: 'relative', marginTop: 'var(--nav-height)', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: 32 }}>
          <Link href="/shop-local" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, marginBottom: 20, textDecoration: 'none' }}>
            ← Back to Shop Local
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>
              {vendor.catIcon} {vendor.catLabel}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{vendor.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 14, color: s <= Math.round(vendor.rating) ? '#F59E0B' : 'rgba(255,255,255,0.3)' }}>★</span>)}
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginLeft: 4 }}>{vendor.rating}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>({vendor.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ background: 'var(--gray-50)', paddingBottom: 80 }}>
        <div className="container" style={{ paddingTop: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* About */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>About</h2>
                <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.75 }}>{vendor.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                  {vendor.tags.map((tag: string) => (
                    <span key={tag} style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', background: 'var(--gray-100)', color: 'var(--gray-600)', borderRadius: 999 }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Hours</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.entries(vendor.hours).map(([day, hours]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid var(--gray-100)' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-700)' }}>{day}</span>
                      <span style={{ fontSize: 14, color: hours === 'Closed' ? '#B91C1C' : 'var(--gray-600)', fontWeight: hours === 'Closed' ? 600 : 400 }}>{hours as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Member deal card */}
              <div style={{ background: 'var(--navy)', borderRadius: 18, padding: 24, border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🏷️ Member Deal</h3>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, marginBottom: 16, filter: vendor.dealLocked ? 'blur(4px)' : 'none' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#60A5FA' }}>{vendor.deal}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Show your membership card at checkout</p>
                </div>
                {vendor.dealLocked && (
                  <>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 14, lineHeight: 1.5 }}>Join Best of PB to unlock this deal and 50+ more across Pacific Beach.</p>
                    <Link href="/memberships" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>Unlock This Deal</Link>
                  </>
                )}
              </div>

              {/* Contact info */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 24 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Contact & Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { icon: '📍', label: vendor.address },
                    { icon: '📞', label: vendor.phone },
                    { icon: '🌐', label: vendor.website },
                    { icon: '📸', label: vendor.instagram },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                      <span style={{ fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.5 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back button */}
              <Link href="/shop-local" className="btn btn-ghost btn-md" style={{ justifyContent: 'center' }}>
                ← Back to all businesses
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
