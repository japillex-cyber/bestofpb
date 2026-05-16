'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SubmissionsPage() {
  const [form, setForm] = useState({ name: '', contentName: '', description: '', instagramHandle: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', height: 48, padding: '0 16px',
    border: '1.5px solid #E4E7EF', borderRadius: 10,
    fontSize: 15, color: '#1A1F30', background: '#F8F9FB',
    outline: 'none', fontFamily: 'inherit',
  }
  const labelStyle = {
    display: 'block' as const, fontSize: 12, fontWeight: 700,
    color: '#6B7590', letterSpacing: '1px',
    textTransform: 'uppercase' as const, marginBottom: 8,
  }

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: '64px 24px 56px', textAlign: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Community</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,5vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
            Submit Your Content
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Know a local gem, creator, or business that deserves a spotlight? Share it with the PB community and we will feature the best.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'flex-start', maxWidth: 960, margin: '0 auto' }}>

            {/* Left — info */}
            <div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 16, letterSpacing: '-0.5px' }}>
                What can you submit?
              </h2>
              <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 32 }}>
                We accept submissions for anything and everything Pacific Beach. Our team reviews every submission and features the best ones on our platform and Instagram page.
              </p>

              {[
                { icon: '🏪', title: 'Local Businesses', desc: 'Hidden gems, new openings, or underrated spots that deserve more love.' },
                { icon: '🎨', title: 'Artists & Creators', desc: 'Local artists, photographers, musicians, or content creators killing it in PB.' },
                { icon: '🏆', title: 'Local Brands', desc: 'Small businesses and brands based in Pacific Beach worth supporting.' },
                { icon: '🎉', title: 'Events & Experiences', desc: 'Cool events, pop-ups, or experiences happening in or around PB.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}

              <div style={{ background: 'var(--navy)', borderRadius: 16, padding: 24, marginTop: 8 }}>
                <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>What happens after you submit?</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                  Our team reviews every submission within 48 hours. If selected, we will feature it on our platform and reach out via Instagram. We feature 3 nominations per month on a dedicated spotlight page.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Submission received!</h3>
                  <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: 24 }}>
                    Thank you for sharing! Our team will review your submission within 48 hours. Keep an eye on <strong>@thebestofpb</strong> for features.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', contentName: '', description: '', instagramHandle: '' }) }}
                    className="btn btn-primary btn-md"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-md)' }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Share Something Great</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28, lineHeight: 1.6 }}>Fill in the details below and our team will take it from there.</p>

                  {error && (
                    <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input type="text" placeholder="Alex Rivera" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Business or Content Name</label>
                      <input type="text" placeholder="e.g. Shore House Kitchen" required value={form.contentName} onChange={e => setForm(f => ({ ...f, contentName: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Instagram Handle</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: 'var(--gray-400)', fontWeight: 600 }}>@</span>
                        <input type="text" placeholder="instagramhandle" value={form.instagramHandle} onChange={e => setForm(f => ({ ...f, instagramHandle: e.target.value }))} style={{ ...inputStyle, paddingLeft: 32 }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Why should we feature this?</label>
                      <textarea
                        placeholder="Tell us what makes this special and why the PB community needs to know about it..."
                        required
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 15, color: '#1A1F30', background: '#F8F9FB', outline: 'none', fontFamily: 'inherit', minHeight: 120, resize: 'vertical', lineHeight: 1.6 }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{ width: '100%', height: 52, background: loading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}
                    >
                      {loading ? 'Submitting...' : 'Submit for Review →'}
                    </button>
                  </form>
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
