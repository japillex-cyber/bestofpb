import Link from 'next/link'

const EVENTS = [
  { day:'22', mon:'Jun', name:'PB Night Market', loc:'Garnet Ave, Pacific Beach', time:'7:00 PM', tag:'Free Entry', tagColor:'#0B7A4B', tagBg:'#E8F5EE', barColor:'linear-gradient(135deg,#0b2d60,#1557c0)' },
  { day:'28', mon:'Jun', name:'Sunrise Surf Competition', loc:'Crystal Pier, PB', time:'9:00 AM', tag:'Members Only', tagColor:'var(--blue)', tagBg:'var(--blue-light)', barColor:'linear-gradient(135deg,#170d35,#5b21b6)' },
  { day:'4',  mon:'Jul', name:'4th of July Beach Bash', loc:'Mission Bay, San Diego', time:'5:00 PM', tag:'VIP Access', tagColor:'#92400E', tagBg:'#FEF3C7', barColor:'linear-gradient(135deg,#7c2d12,#f59e0b)' },
]

export default function EventsPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">What's On</span>
            <h2 className="section-title">Upcoming Events</h2>
          </div>
          <Link href="/events" className="view-all">View full calendar →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {EVENTS.map(ev => (
            <div key={ev.name} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {/* Date bar */}
              <div style={{ background: ev.barColor, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: '8px 12px', textAlign: 'center', minWidth: 52 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{ev.day}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase' }}>{ev.mon}</div>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{ev.time}</span>
              </div>
              {/* Body */}
              <div style={{ padding: '16px 20px 18px' }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 5, lineHeight: 1.25 }}>{ev.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 12 }}>📍 {ev.loc}</p>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: ev.tagBg, color: ev.tagColor }}>{ev.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
