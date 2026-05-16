'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const SAMPLE_NOMINATIONS = [
  { id: '1', businessName: 'Kono Pizza', instagramHandle: '@konopizzapb', reason: 'Best late night pizza in all of Pacific Beach. Cone-shaped pizza that is absolutely genius and delicious. Open till 3am on weekends!', category: 'Food', upvotes: 142, downvotes: 3, createdAt: '2025-06-10' },
  { id: '2', businessName: 'Waverly Art Studio', instagramHandle: '@wavelyartstudio', reason: 'Local artist creating stunning ocean-inspired murals all across PB. Her work transformed the Garnet Ave walls into an open air gallery.', category: 'Arts', upvotes: 98, downvotes: 1, createdAt: '2025-06-12' },
  { id: '3', businessName: 'PB Surf School', instagramHandle: '@pbsurfschool', reason: 'Best surf instructors in San Diego. Patient, fun, and professional. Got my whole family up on boards in one session!', category: 'Fitness', upvotes: 87, downvotes: 5, createdAt: '2025-06-14' },
  { id: '4', businessName: 'The Taco Stand', instagramHandle: '@thetacostandpb', reason: 'Authentic street tacos right on Mission Blvd. The al pastor is life-changing. Cash only but 100% worth it every single time.', category: 'Food', upvotes: 203, downvotes: 8, createdAt: '2025-06-08' },
  { id: '5', businessName: 'Sandy Paws Rescue', instagramHandle: '@sandypawsrescue', reason: 'Local dog rescue doing incredible work in PB. They have saved hundreds of dogs and always need volunteers and donations.', category: 'Pets', upvotes: 167, downvotes: 2, createdAt: '2025-06-11' },
  { id: '6', businessName: 'PB Farmers Market', instagramHandle: '@pbfarmersmarket', reason: 'Every Saturday morning on Bayard St. Fresh local produce, amazing vendors, and the best breakfast burritos. A PB institution!', category: 'Market', upvotes: 134, downvotes: 4, createdAt: '2025-06-09' },
]

const CATEGORIES = ['All', 'Food', 'Arts', 'Fitness', 'Pets', 'Market', 'Services', 'Nightlife']

export default function NominationsPage() {
  const [nominations, setNominations] = useState(SAMPLE_NOMINATIONS)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('most-voted')
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [voted, setVoted] = useState<Record<string, 'up' | 'down'>>({})
  const [form, setForm] = useState({ businessName: '', instagramHandle: '', reason: '', category: '', submittedByName: '', submittedByEmail: '' })
  const [loading, setLoading] = useState(false)

  const filtered = nominations
    .filter(n => activeCategory === 'All' || n.category === activeCategory)
    .sort((a, b) => {
      if (sort === 'most-voted') return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const handleVote = (id: string, type: 'up' | 'down') => {
    if (voted[id]) return
    setVoted(v => ({ ...v, [id]: type }))
    setNominations(noms => noms.map(n => {
      if (n.id !== id) return n
      return { ...n, upvotes: type === 'up' ? n.upvotes + 1 : n.upvotes, downvotes: type === 'down' ? n.downvotes + 1 : n.downvotes }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/nominations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', height: 46, padding: '0 14px',
    border: '1.5px solid #E4E7EF', borderRadius: 10,
    fontSize: 14, color: '#1A1F30', background: '#F8F9FB',
    outline: 'none', fontFamily: 'inherit',
  }
  const labelStyle = {
    display: 'block' as const, fontSize: 11, fontWeight: 700,
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
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 10 }}>Community</span>
              <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 10 }}>
                PB Nominations
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 500 }}>
                Nominate a business, artist, or creator you love. The community votes and we feature the top 3 every month.
              </p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn btn-primary btn-lg">
              + Nominate Someone
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', flex: 1 }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '7px 14px', borderRadius: 999, border: 'none', background: activeCategory === cat ? '#0057FF' : 'rgba(255,255,255,0.08)', color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {cat}
                </button>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 14px', color: '#fff', fontSize: 13, fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
              <option value="most-voted" style={{ background: '#04091C' }}>Most Voted</option>
              <option value="newest" style={{ background: '#04091C' }}>Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nominations list */}
      <div style={{ background: 'var(--gray-50)', padding: '36px 0 80px' }}>
        <div className="container">
          <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 24 }}>
            <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> nominations
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map((nom, i) => (
              <div key={nom.id} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: '22px 24px', display: 'flex', gap: 20, alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>

                {/* Rank */}
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: i < 3 ? 'var(--blue)' : 'var(--gray-100)', color: i < 3 ? '#fff' : 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 800, flexShrink: 0 }}>
                  {i + 1}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: 'var(--gray-900)' }}>{nom.businessName}</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', background: 'var(--blue-light)', color: 'var(--blue)', borderRadius: 999 }}>{nom.category}</span>
                    {nom.instagramHandle && (
                      <a href={`https://instagram.com/${nom.instagramHandle.replace('@','')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500 }}>{nom.instagramHandle}</a>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{nom.reason}</p>
                </div>

                {/* Vote buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => handleVote(nom.id, 'up')}
                    disabled={!!voted[nom.id]}
                    style={{ width: 44, height: 44, borderRadius: 12, border: `1.5px solid ${voted[nom.id] === 'up' ? 'var(--blue)' : 'var(--gray-200)'}`, background: voted[nom.id] === 'up' ? 'var(--blue-light)' : '#fff', color: voted[nom.id] === 'up' ? 'var(--blue)' : 'var(--gray-500)', fontSize: 18, cursor: voted[nom.id] ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}
                  >▲</button>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: 'var(--gray-900)' }}>
                    {nom.upvotes - nom.downvotes}
                  </span>
                  <button
                    onClick={() => handleVote(nom.id, 'down')}
                    disabled={!!voted[nom.id]}
                    style={{ width: 44, height: 44, borderRadius: 12, border: `1.5px solid ${voted[nom.id] === 'down' ? '#B91C1C' : 'var(--gray-200)'}`, background: voted[nom.id] === 'down' ? '#FEE2E2' : '#fff', color: voted[nom.id] === 'down' ? '#B91C1C' : 'var(--gray-500)', fontSize: 18, cursor: voted[nom.id] ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}
                  >▼</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nomination modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.85)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 22, padding: 36, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', fontFamily: 'inherit' }}>✕</button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🏆</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Nomination submitted!</h3>
                <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.6 }}>Our team will review it and add it to the community voting board.</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Nominate Someone</h2>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 24, lineHeight: 1.6 }}>Tell us about a business, artist, or creator in PB that deserves recognition.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div><label style={labelStyle}>Your Name</label><input type="text" placeholder="Alex Rivera" required value={form.submittedByName} onChange={e => setForm(f => ({ ...f, submittedByName: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Your Email</label><input type="email" placeholder="you@example.com" required value={form.submittedByEmail} onChange={e => setForm(f => ({ ...f, submittedByEmail: e.target.value }))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Business / Person Name</label><input type="text" placeholder="e.g. Waverly Art Studio" required value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} style={inputStyle} /></div>
                  <div>
                    <label style={labelStyle}>Instagram Handle</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--gray-400)', fontWeight: 600 }}>@</span>
                      <input type="text" placeholder="instagramhandle" value={form.instagramHandle} onChange={e => setForm(f => ({ ...f, instagramHandle: e.target.value }))} style={{ ...inputStyle, paddingLeft: 30 }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select a category...</option>
                      {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Why are you nominating them?</label>
                    <textarea placeholder="What makes them special? Why should the PB community know about them?" required value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 14, color: '#1A1F30', background: '#F8F9FB', outline: 'none', fontFamily: 'inherit', minHeight: 100, resize: 'vertical' }} />
                  </div>
                  <button type="submit" disabled={loading} style={{ width: '100%', height: 50, background: loading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginTop: 4 }}>
                    {loading ? 'Submitting...' : 'Submit Nomination →'}
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
