'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const PERKS = [
  { icon: '💳', title: 'Free Membership', desc: 'Complimentary VIP membership for the duration of your partnership.' },
  { icon: '📸', title: 'Featured on BOPB', desc: 'Your content featured on our Instagram, website, and newsletter.' },
  { icon: '🏷️', title: 'Exclusive Deals', desc: 'Access to special influencer deals at all partner businesses.' },
  { icon: '🎁', title: 'Monthly Gifting', desc: 'Receive products and experiences from our partner vendors.' },
  { icon: '📊', title: 'Collab Opportunities', desc: 'Co-create content with local businesses for mutual exposure.' },
  { icon: '🏆', title: 'Event Access', desc: 'VIP access to all BOPB events and exclusive influencer-only gatherings.' },
]

export default function InfluencerPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', instagram: '', tiktok: '', youtube: '',
    followers: '', niche: '', location: '', contentType: '', collab: '', why: '',
    rate: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Simulate submission
    await new Promise(r => setTimeout(r, 1500))
    setSubmitted(true)
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 48, padding: '0 16px',
    border: '1.5px solid var(--gray-200)', borderRadius: 10,
    fontSize: 14, color: 'var(--gray-800)', background: 'var(--gray-50)',
    outline: 'none', fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 700,
    color: 'var(--gray-500)', letterSpacing: '1px',
    textTransform: 'uppercase', marginBottom: 8,
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -150, right: -150, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,87,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(131,58,180,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', padding: '64px 24px 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,rgba(131,58,180,0.3),rgba(253,29,29,0.3))', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>📸</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.5px' }}>Creator Program</span>
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
            Partner with<br />Best of PB
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Are you a content creator, influencer, or local personality who loves Pacific Beach? Let's create something amazing together.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div style={{ background: '#fff', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 10 }}>Why partner with us</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px' }}>What you get</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
            {PERKS.map(perk => (
              <div key={perk.title} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 16, padding: '22px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{perk.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 5 }}>{perk.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application form */}
      <div style={{ background: 'var(--gray-50)', padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          {submitted ? (
            <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 22, padding: 56, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.5px' }}>Application received!</h2>
              <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.75, marginBottom: 28, maxWidth: 420, margin: '0 auto 28px' }}>
                Thank you for applying to partner with Best of PB! Our team will review your application and get back to you within 3-5 business days.
              </p>
              <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 24 }}>
                In the meantime, follow us at <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600 }}>@thebestofpb</a>
              </p>
              <button onClick={() => setSubmitted(false)} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Submit Another Application
              </button>
            </div>
          ) : (
            <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 22, padding: '40px 44px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.3px' }}>Apply to Partner</h2>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 }}>Fill in your details and we will review your application within 3-5 business days. We accept creators of all sizes — micro to macro!</p>
              </div>

              {error && (
                <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Personal info */}
                <div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-700)' }}>Personal Info</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" placeholder="Alex Rivera" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input type="tel" placeholder="(619) 555-0100" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Location *</label>
                      <input type="text" placeholder="Pacific Beach, San Diego" required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-700)' }}>Social Media</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Instagram Handle *</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--gray-400)', fontWeight: 600 }}>@</span>
                        <input type="text" placeholder="yourhandle" required value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} style={{ ...inputStyle, paddingLeft: 32 }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>TikTok Handle</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--gray-400)', fontWeight: 600 }}>@</span>
                        <input type="text" placeholder="yourhandle" value={form.tiktok} onChange={e => setForm(f => ({ ...f, tiktok: e.target.value }))} style={{ ...inputStyle, paddingLeft: 32 }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>YouTube Channel</label>
                      <input type="text" placeholder="youtube.com/c/yourchannel" value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Total Followers (approx) *</label>
                      <select required value={form.followers} onChange={e => setForm(f => ({ ...f, followers: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select range...</option>
                        <option value="under-1k">Under 1,000</option>
                        <option value="1k-5k">1,000 – 5,000</option>
                        <option value="5k-10k">5,000 – 10,000</option>
                        <option value="10k-50k">10,000 – 50,000</option>
                        <option value="50k-100k">50,000 – 100,000</option>
                        <option value="100k+">100,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-700)' }}>Content & Partnership</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div>
                        <label style={labelStyle}>Content Niche *</label>
                        <select required value={form.niche} onChange={e => setForm(f => ({ ...f, niche: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                          <option value="">Select niche...</option>
                          <option value="food-drink">Food & Drinks</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="travel">Travel & Local</option>
                          <option value="fitness">Fitness & Wellness</option>
                          <option value="fashion">Fashion & Beauty</option>
                          <option value="nightlife">Nightlife & Events</option>
                          <option value="family">Family & Parenting</option>
                          <option value="comedy">Comedy & Entertainment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Content Format *</label>
                        <select required value={form.contentType} onChange={e => setForm(f => ({ ...f, contentType: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                          <option value="">Select format...</option>
                          <option value="reels-tiktok">Reels / TikTok</option>
                          <option value="stories">Stories</option>
                          <option value="photos">Photos / Posts</option>
                          <option value="youtube">YouTube Videos</option>
                          <option value="blog">Blog / Written</option>
                          <option value="mixed">Mixed / All formats</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>What type of collab are you interested in? *</label>
                      <select required value={form.collab} onChange={e => setForm(f => ({ ...f, collab: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select type...</option>
                        <option value="gifted">Gifted collaborations (product/experience for content)</option>
                        <option value="paid">Paid partnerships</option>
                        <option value="ambassador">Long-term brand ambassador</option>
                        <option value="affiliate">Affiliate / discount code</option>
                        <option value="all">Open to all of the above</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Rate / Budget expectations (optional)</label>
                      <input type="text" placeholder="e.g. $200 per reel, open to gifted, etc." value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Why do you want to partner with Best of PB? *</label>
                      <textarea
                        placeholder="Tell us about yourself, your audience, and why you'd be a great fit for BOPB. Include any relevant past brand partnerships or content examples..."
                        required
                        value={form.why}
                        onChange={e => setForm(f => ({ ...f, why: e.target.value }))}
                        style={{ width: '100%', padding: '14px 16px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, color: 'var(--gray-800)', background: 'var(--gray-50)', outline: 'none', fontFamily: 'inherit', minHeight: 130, resize: 'vertical', lineHeight: 1.6 }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', height: 54, background: loading ? '#9AA3B8' : 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Submitting application...' : '📸 Submit Application'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.6 }}>
                  We review all applications within 3-5 business days. No follower minimum — we love micro-creators too! Questions? DM us at <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>@thebestofpb</a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
