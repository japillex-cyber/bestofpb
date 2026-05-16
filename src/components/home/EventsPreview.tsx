'use client'
import Link from 'next/link'

const EVENTS = [
  { day:'22', mon:'Jun', name:'PB Night Market', loc:'Garnet Ave, Pacific Beach', time:'7:00 PM', tag:'Free Entry', tagColor:'#0B7A4B', tagBg:'#E8F5EE', barColor:'linear-gradient(135deg,#0b2d60,#1557c0)' },
  { day:'28', mon:'Jun', name:'Sunrise Surf Competition', loc:'Crystal Pier, PB', time:'9:00 AM', tag:'Members Only', tagColor:'var(--blue)', tagBg:'var(--blue-light)', barColor:'linear-gradient(135deg,#170d35,#5b21b6)' },
  { day:'4',  mon:'Jul', name:'4th of July Beach Bash', loc:'Mission Bay, San Diego', time:'5:00 PM', tag:'VIP Access', tagColor:'#92400E', tagBg:'#FEF3C7', barColor:'linear-gradient(135deg,#7c2d12,#f59e0b)' },
  { day:'12', mon:'Jul', name:'Beach Bonfire Night', loc:'South Crystal Pier Beach', time:'7:00 PM', tag:'Limited Spots', tagColor:'#92400E', tagBg:'#FEF3C7', barColor:'linear-gradient(135deg,#1a2a00,#3a5a00)' },
]

export default function EventsPreview() {
  return (
    <section style={{ padding: '64px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 6 }}>What's On</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>Upcoming Events</h2>
          </div>
          <Link href="/events" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>View full calendar →</Link>
        </div>

        {/* Desktop grid */}
        <div className="events-desktop" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {EVENTS.slice(0, 3).map(ev => <EventCard key={ev.name} ev={ev} />)}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="events-mobile" style={{ display: 'none' }}>
          <div style={{
            display: 'flex', gap: 14,
            overflowX: 'auto', scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
            paddingBottom: 12,
            margin: '0 -16px', paddingLeft: 16, paddingRight: 16,
          }}>
            {EVENTS.map(ev => (
              <div key={ev.name} style={{ minWidth: '78vw', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                <EventCard ev={ev} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>← Swipe to see more →</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .events-desktop { display: none !important; }
          .events-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function EventCard({ ev }: { ev: typeof EVENTS[0] }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ background: ev.barColor, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: '8px 12px', textAlign: 'center', minWidth: 52 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{ev.day}</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase' }}>{ev.mon}</div>
        </div>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{ev.time}</span>
      </div>
      <div style={{ padding: '16px 20px 18px' }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 5, lineHeight: 1.25 }}>{ev.name}</h3>
        <p style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 12 }}>📍 {ev.loc}</p>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: ev.tagBg, color: ev.tagColor }}>{ev.tag}</span>
      </div>
    </div>
  )
}
