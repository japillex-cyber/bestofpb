'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function GiveawayPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/giveaway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Entry failed')
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', height: 52, padding: '0 18px',
    border: '1.5px solid rgba(255,255,255,0.15)',
    borderRadius: 12, fontSize: 15, color: '#fff',
    background: 'rgba(255,255,255,0.08)',
    outline: 'none', fontFamily: 'inherit',
  }
  const labelStyle = {
    display: 'block' as const, fontSize: 11, fontWeight: 700,
    color: 'rgba(255,255,255,0.5)', letterSpacing: '1px',
    textTransform: 'uppercase' as const, marginBottom: 8,
  }

  return (
    <>
      <Navbar />

      {/* Full page hero with giveaway */}
      <div style={{ background: 'var(--navy)', minHeight: '100vh', paddingTop: 'var(--nav-height)', position: 'relative', overflow: 'hidden' }}>

        {/* Background decoration */}
        <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,87,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,150,42,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ padding: '60px 24px 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 64, alignItems: 'center', maxWidth: 1000, margin: '0 auto' }}>

            {/* Left — prize info */}
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,150,42,0.15)', border: '1px solid rgba(200,150,42,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 28 }}>
                <span style={{ fontSize: 14 }}>🎁</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#C8962A', letterSpacing: '0.5px' }}>ACTIVE GIVEAWAY</span>
              </div>

              <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 20 }}>
                Win a Free Year of<br />
                <span style={{ color: '#C8962A' }}>VIP Membership</span>
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 36, maxWidth: 440 }}>
                Enter for your chance to win a full year of Best of PB VIP membership — worth <strong style={{ color: '#fff' }}>$350</strong>. Includes exclusive deals at 50+ Pacific Beach businesses, VIP line status, and your gold membership card.
              </p>

              {/* Prize details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                {[
                  { icon: '⭐', label: 'Prize Value', value: '$350 VIP Membership (1 year)' },
                  { icon: '📅', label: 'Draw Date', value: 'July 31, 2025 · Announced on @thebestofpb' },
                  { icon: '🎯', label: 'How to Win', value: 'Enter below — one entry per person' },
                  { icon: '📸', label: 'Extra Entry', value: 'Follow @thebestofpb on Instagram' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* What you win */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>What the winner gets:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Full year of VIP membership ($350 value)',
                    'Exclusive discounts at 50+ PB businesses',
                    'VIP line status at select venues',
                    'Gold VIP physical membership card',
                    'Priority access to all BOPB events',
                    'Exclusive VIP-only deals and offers',
                  ].map(perk => (
                    <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(200,150,42,0.2)', color: '#C8962A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)' }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — entry form */}
            <div>
              {submitted ? (
                <div style={{ background: 'linear-gradient(145deg, #1a2a00, #0d1a00)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 24, padding: 44, textAlign: 'center' }}>
                  <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: '#4ADE80', marginBottom: 12, letterSpacing: '-0.5px' }}>
                    You're entered!
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>
                    Good luck! Winner will be announced on{' '}
                    <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" style={{ color: '#4ADE80', fontWeight: 600 }}>@thebestofpb</a>
                    {' '}on July 31st.
                  </p>

                  {/* Share prompt */}
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 20, marginBottom: 24 }}>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
                      📸 Follow us for an extra entry and to see if you won!
                    </p>
                    <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', color: '#fff', fontSize: 14, fontWeight: 700, padding: '10px 22px', borderRadius: 10, textDecoration: 'none' }}>
                      📸 Follow @thebestofpb
                    </a>
                  </div>

                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '' }) }}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Enter a different email
                  </button>
                </div>
              ) : (
                <div style={{ background: 'linear-gradient(145deg, #0d1835, #091228)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
                  <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 48, fontWeight: 800, color: '#C8962A', lineHeight: 1, letterSpacing: '-1px' }}>$350</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>VIP Membership Prize</div>
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(185,28,28,0.15)', border: '1px solid rgba(185,28,28,0.3)', color: '#FCA5A5', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input
                        type="text"
                        placeholder="Alex"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="(619) 555-0100"
                        required
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ width: '100%', height: 56, background: loading ? 'rgba(200,150,42,0.5)' : 'linear-gradient(135deg, #92400e, #C8962A)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 800, fontFamily: "'Bricolage Grotesque',sans-serif", cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '-0.3px', marginTop: 4 }}
                    >
                      {loading ? 'Entering...' : '🎁 Enter to Win'}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
                      One entry per person. By entering you agree to receive emails from Best of PB. Winner announced July 31, 2025.
                    </p>
                  </form>

                  {/* Entry count */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 24, paddingTop: 20, display: 'flex', justifyContent: 'space-around' }}>
                    {[['847', 'Entries so far'], ['12', 'Days left'], ['1', 'Winner']].map(([num, label]) => (
                      <div key={label} style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff' }}>{num}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginTop: 2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
