import Link from 'next/link'

const CATS = [
  { slug:'pb-nights',     label:'PB Nights',       icon:'🌙', color:'#1A1A4E' },
  { slug:'get-outside',   label:'Get Outside',      icon:'🏄', color:'#0D4A2E' },
  { slug:'hungry',        label:"I'm Hungry",       icon:'🍽️', color:'#4A1A00' },
  { slug:'fitness',       label:'Healthy & Fit',    icon:'💪', color:'#0A3A2A' },
  { slug:'self-care',     label:'Self Care',        icon:'✨', color:'#3A0A3A' },
  { slug:'services',      label:'Services',         icon:'🔧', color:'#1A2A4A' },
  { slug:'pets',          label:'I Love My Pet',    icon:'🐾', color:'#3A2A0A' },
  { slug:'cozy-stays',    label:'Cozy Stays',       icon:'🏨', color:'#0A1A3A' },
  { slug:'event-planning',label:'Event Planning',   icon:'🎉', color:'#3A0A1A' },
  { slug:'around-town',   label:'Around Town',      icon:'🗺️', color:'#1A3A0A' },
  { slug:'apparel',       label:'Apparel',          icon:'👗', color:'#2A1A3A' },
  { slug:'cool-shit',     label:'Cool Shit',        icon:'🔥', color:'#3A1A00' },
  { slug:'drinks',        label:'Drinks',           icon:'🍹', color:'#001A3A' },
]

export default function Categories() {
  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Explore</span>
            <h2 className="section-title">Shop Local by Category</h2>
          </div>
          <Link href="/shop-local" className="view-all">View all →</Link>
        </div>

        <div style={{
          display: 'flex', gap: 16, overflowX: 'auto',
          paddingBottom: 8, scrollbarWidth: 'none',
          margin: '0 -24px', padding: '0 24px 8px',
        }}>
          {CATS.map(cat => (
            <Link key={cat.slug} href={`/shop-local?cat=${cat.slug}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 8, minWidth: 90, flexShrink: 0, textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: 18,
                background: cat.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, boxShadow: 'var(--shadow-sm)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}>{cat.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
