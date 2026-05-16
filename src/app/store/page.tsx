import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const STORE_ITEMS = [
  { id:'1', name:'BOPB Classic Tee', price:35, category:'Apparel', emoji:'👕', desc:'Soft cotton tee with the iconic Best of PB wave logo. Available in navy and white.', colors:['Navy','White','Sand'], sizes:['S','M','L','XL','XXL'] },
  { id:'2', name:'PB Locals Hoodie', price:65, category:'Apparel', emoji:'🧥', desc:'Premium heavyweight hoodie. Stay cozy on those PB evening walks.', colors:['Navy','Black'], sizes:['S','M','L','XL'] },
  { id:'3', name:'Wave Dad Hat', price:30, category:'Accessories', emoji:'🧢', desc:'Structured dad hat with embroidered wave logo. One size fits most.', colors:['Navy','Tan','Black'], sizes:['One Size'] },
  { id:'4', name:'PB Tote Bag', price:25, category:'Accessories', emoji:'👜', desc:'Heavy canvas tote with the Best of PB crest. Perfect for the farmers market.', colors:['Natural','Navy'], sizes:['One Size'] },
  { id:'5', name:'Locals Only Sticker Pack', price:12, category:'Accessories', emoji:'🎨', desc:'Pack of 5 premium vinyl stickers. Waterproof and UV resistant.', colors:['Multi'], sizes:['One Size'] },
  { id:'6', name:'PB Membership Bundle', price:180, category:'Bundles', emoji:'🎁', desc:'Regular membership + BOPB tee + hat. The perfect welcome package.', colors:['Mixed'], sizes:['S','M','L','XL'] },
]

const CATEGORIES = ['All', 'Apparel', 'Accessories', 'Bundles']

export default function StorePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 24px 48px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Official Merch</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
            Best of PB Store
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Rep Pacific Beach with official BOPB merch. Every purchase supports the local community.
          </p>
        </div>
      </div>

      {/* Products */}
      <div style={{ background: 'var(--gray-50)', padding: '40px 0 80px' }}>
        <div className="container">
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <span key={cat} style={{ padding: '7px 16px', borderRadius: 999, background: cat === 'All' ? 'var(--blue)' : '#fff', color: cat === 'All' ? '#fff' : 'var(--gray-600)', fontSize: 13, fontWeight: 600, border: '1px solid var(--gray-200)', cursor: 'pointer' }}>
                {cat}
              </span>
            ))}
          </div>

          {/* Products grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {STORE_ITEMS.map((item, i) => (
              <div key={item.id} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s' }}>
                {/* Product image placeholder */}
                <div style={{ height: 200, background: 'linear-gradient(135deg, var(--navy) 0%, #0d2a50 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72 }}>
                  {item.emoji}
                </div>

                <div style={{ padding: '18px 20px 22px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 6 }}>{item.category}</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8, letterSpacing: '-0.2px' }}>{item.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14 }}>{item.desc}</p>

                  {/* Colors */}
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Colors: </span>
                    <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>{item.colors.join(', ')}</span>
                  </div>

                  {/* Sizes */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                    {item.sizes.map(size => (
                      <span key={size} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', background: 'var(--gray-100)', color: 'var(--gray-600)', borderRadius: 6, border: '1px solid var(--gray-200)' }}>{size}</span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--gray-100)' }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--gray-900)' }}>${item.price}</span>
                    <button style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming soon note */}
          <div style={{ textAlign: 'center', marginTop: 48, background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 36 }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🚧</div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Full store coming soon!</h3>
            <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 22, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 22px' }}>
              We are setting up our full ecommerce store. Want to be notified when it launches?
            </p>
            <Link href="/contact" style={{ display: 'inline-block', background: 'var(--blue)', color: '#fff', fontSize: 14, fontWeight: 700, padding: '11px 24px', borderRadius: 10, textDecoration: 'none' }}>
              Get Notified
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
