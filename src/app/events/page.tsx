'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const EVENTS = [
  { id:'1', title:'PB Night Market', date:'2025-06-22', time:'7:00 PM', endTime:'11:00 PM', location:'Garnet Ave, Pacific Beach', category:'market', isFree:true, image:'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=70', desc:'Pacific Beach monthly night market featuring local vendors, food trucks, live music, and artisan goods. Free entry for everyone!', organizer:'Best of PB', tag:'Free Entry', tagColor:'#0B7A4B', tagBg:'#E8F5EE' },
  { id:'2', title:'Sunrise Surf Competition', date:'2025-06-28', time:'9:00 AM', endTime:'4:00 PM', location:'Crystal Pier, Pacific Beach', category:'sports', isFree:false, price:25, image:'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=70', desc:'Annual Pacific Beach surf competition open to all skill levels. Watch the pros or compete yourself. Members get priority registration.', organizer:'Pacific Fit Studio', tag:'Members Only', tagColor:'#0057FF', tagBg:'#EBF0FF' },
  { id:'3', title:'4th of July Beach Bash', date:'2025-07-04', time:'5:00 PM', endTime:'12:00 AM', location:'Mission Bay, San Diego', category:'holiday', isFree:false, price:45, image:'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=70', desc:'The biggest 4th of July party in PB. Live bands, fireworks over the bay, food vendors, and VIP sections for BOPB members.', organizer:'Best of PB', tag:'VIP Access', tagColor:'#92400E', tagBg:'#FEF3C7' },
  { id:'4', title:'Rooftop Yoga at Sunrise', date:'2025-06-25', time:'6:30 AM', endTime:'8:00 AM', location:'Wave Lounge Rooftop, PB', category:'fitness', isFree:false, price:20, image:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=70', desc:'Start your morning right with rooftop yoga overlooking the Pacific Ocean. All levels welcome. Mats provided. Coffee after class.', organizer:'Pacific Fit Studio', tag:'Members Save', tagColor:'#0057FF', tagBg:'#EBF0FF' },
  { id:'5', title:'PB Restaurant Week', date:'2025-07-07', time:'11:00 AM', endTime:'10:00 PM', location:'Various Locations, PB', category:'food', isFree:true, image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70', desc:'A week-long celebration of PB best restaurants offering special prix-fixe menus. Members get additional discounts at participating venues.', organizer:'Best of PB', tag:'Free Entry', tagColor:'#0B7A4B', tagBg:'#E8F5EE' },
  { id:'6', title:'Beach Bonfire Night', date:'2025-07-12', time:'7:00 PM', endTime:'11:00 PM', location:'South Crystal Pier Beach', category:'social', isFree:false, price:35, image:'https://images.unsplash.com/photo-1517315003714-a071486bd9ea?w=600&q=70', desc:'Monthly beach bonfire with smores, acoustic music, and great company. Limited to 60 guests for an intimate vibe. BYOB welcome.', organizer:'Best of PB', tag:'Limited Spots', tagColor:'#92400E', tagBg:'#FEF3C7' },
  { id:'7', title:'PB Art Walk', date:'2025-07-19', time:'12:00 PM', endTime:'6:00 PM', location:'Garnet Ave and Cass St', category:'arts', isFree:true, image:'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=70', desc:'Monthly art walk featuring local PB artists, galleries, pop-up shops, and live street performances along Garnet Avenue.', organizer:'PB Arts Council', tag:'Free Entry', tagColor:'#0B7A4B', tagBg:'#E8F5EE' },
  { id:'8', title:'Happy Hour Crawl', date:'2025-06-27', time:'4:00 PM', endTime:'8:00 PM', location:'Starting at Craft and Pint', category:'nightlife', isFree:false, price:30, image:'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=600&q=70', desc:'Hit the best happy hours across PB in one epic crawl. 5 venues, exclusive deals at each stop. BOPB members get $10 off.', organizer:'Best of PB', tag:'Members Save', tagColor:'#0057FF', tagBg:'#EBF0FF' },
]

const CATEGORIES = [
  { slug:'all',       label:'All Events', icon:'🗓️' },
  { slug:'market',    label:'Markets',    icon:'🏪' },
  { slug:'sports',    label:'Sports',     icon:'🏄' },
  { slug:'fitness',   label:'Fitness',    icon:'💪' },
  { slug:'food',      label:'Food',       icon:'🍽️' },
  { slug:'social',    label:'Social',     icon:'🔥' },
  { slug:'arts',      label:'Arts',       icon:'🎨' },
  { slug:'nightlife', label:'Nightlife',  icon:'🌙' },
  { slug:'holiday',   label:'Holiday',    icon:'🎉' },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.getDate(),
    month: d.toLocaleString('default', { month: 'short' }),
    weekday: d.toLocaleString('default', { weekday: 'short' }),
  }
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showFree, setShowFree] = useState(false)
  const [search, setSearch] = useState('')
  const [submitOpen, setSubmitOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', title:'', date:'', location:'', desc:'', url:'' })

  const filtered = EVENTS.filter(e => {
    const matchCat = activeCategory === 'all' || e.category === activeCategory
    const matchFree = !showFree || e.isFree
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchFree && matchSearch
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitOpen(false); setSubmitted(false) }, 2500)
  }

  const inputStyle = {
    width: '100%', height: 46, padding: '0 14px',
    border: '1.5px solid #E4E7EF', borderRadius: 10,
    fontSize: 14, color: '#1A1F30', background: '#F8F9FB',
    outline: 'none', fontFamily: 'inherit',
  }

  const labelStyle = {
    display: 'block' as const,
    fontSize: 12, fontWeight: 700,
    color: '#6B7590', letterSpacing: '1px',
    textTransform: 'uppercase' as const, marginBottom: 7,
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: '56px 24px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 10 }}>Pacific Beach</span>
              <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 10 }}>
                What is On in PB
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>
                Discover events, submit your own, and never miss what is happening.
              </p>
            </div>
            <button onClick={() => setSubmitOpen(true)} className="btn btn-primary btn-lg">
              + Submit an Event
            </button>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '0 16px', height: 46 }}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14, fontFamily: 'inherit' }}
              />
            </div>
            <button
              onClick={() => setShowFree(!showFree)}
              style={{ padding: '0 20px', height: 46, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: showFree ? '#0B7A4B' : 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {showFree ? '✓ Free only' : 'Free only'}
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, border: 'none', background: activeCategory === cat.slug ? '#0057FF' : 'rgba(255,255,255,0.06)', color: activeCategory === cat.slug ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events list */}
      <div style={{ background: 'var(--gray-50)', padding: '36px 0 80px' }}>
        <div className="container">
          <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28 }}>
            <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> events found
          </p>

          {filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map((event) => {
                const d = formatDate(event.date)
                return (
                  <div
                    key={event.id}
                    style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden', display: 'grid', gridTemplateColumns: '100px 1fr auto', boxShadow: 'var(--shadow-sm)' }}
                  >
                    {/* Date */}
                    <div style={{ background: 'var(--navy)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>{d.weekday}</span>
                      <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{d.day}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase' }}>{d.month}</span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px 22px', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                      <div style={{ width: 90, height: 70, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: event.tagBg, color: event.tagColor }}>{event.tag}</span>
                          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>by {event.organizer}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 6 }}>{event.title}</h3>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>🕐 {event.time} - {event.endTime}</span>
                          <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>📍 {event.location}</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.5 }}>{event.desc}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div style={{ padding: '20px 22px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 10, minWidth: 130 }}>
                      <div style={{ textAlign: 'right' }}>
                        {event.isFree ? (
                          <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, color: '#0B7A4B' }}>Free</span>
                        ) : (
                          <>
                            <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>${event.price}</span>
                            <span style={{ fontSize: 12, color: 'var(--gray-400)', display: 'block' }}>per person</span>
                          </>
                        )}
                      </div>
                      <button style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {event.isFree ? 'Learn More' : 'Get Tickets'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>📅</div>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>No events found</h3>
              <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 20 }}>Try a different category or clear your filters.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearch(''); setShowFree(false) }}
                className="btn btn-primary btn-md"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit modal */}
      {submitOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.85)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 22, padding: 36, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button
              onClick={() => setSubmitOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', background: '#F1F3F7', border: 'none', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A5268', fontFamily: 'inherit' }}
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Event submitted!</h3>
                <p style={{ fontSize: 15, color: '#6B7590' }}>We will review it and publish within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Submit an Event</h2>
                <p style={{ fontSize: 14, color: '#6B7590', marginBottom: 24, lineHeight: 1.6 }}>Our team reviews all submissions and publishes within 24 hours.</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div><label style={labelStyle}>Your Name</label><input type="text" placeholder="Alex Rivera" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Your Email</label><input type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Event Name</label><input type="text" placeholder="e.g. PB Night Market" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Event Date</label><input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Location</label><input type="text" placeholder="e.g. Garnet Ave, Pacific Beach" required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Event Link (optional)</label><input type="url" placeholder="https://eventbrite.com/..." value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} style={inputStyle} /></div>
                  <div>
                    <label style={labelStyle}>Description</label>
                    <textarea placeholder="Tell us about your event..." required value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 14, color: '#1A1F30', background: '#F8F9FB', outline: 'none', fontFamily: 'inherit', minHeight: 100, resize: 'vertical' }} />
                  </div>
                  <button type="submit" style={{ width: '100%', height: 50, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>
                    Submit Event
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
