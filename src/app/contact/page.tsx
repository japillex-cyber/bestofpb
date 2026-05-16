'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send')
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', height: 48, padding: '0 16px',
    border: '1.5px solid var(--gray-200)', borderRadius: 10,
    fontSize: 15, color: 'var(--gray-800)', background: 'var(--gray-50)',
    outline: 'none', fontFamily: 'inherit',
  }
  const labelStyle = {
    display: 'block' as const, fontSize: 12, fontWeight: 700,
    color: 'var(--gray-500)', letterSpacing: '1px',
    textTransform: 'uppercase' as const, marginBottom: 8,
  }

  return (
    <>
      <Navbar />

      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '64px 24px 52px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Get in Touch</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,5vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
            Contact Best of PB
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Questions, vendor inquiries, partnerships, or just want to say hi — we would love to hear from you.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', padding: '56px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, maxWidth: 960, margin: '0 auto', alignItems: 'flex-start' }}>

            {/* Left — contact info */}
            <div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>We are here to help</h2>
              <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: 36 }}>
                Whether you have questions about membership, want to become a vendor, are interested in a package, or just want to connect — reach out and our team will get back to you within 24 hours.
              </p>

              {/* Contact methods */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                {[
                  { icon: '📸', label: 'Instagram', value: '@thebestofpb', link: 'https://instagram.com/thebestofpb', desc: 'DM us for quickest response' },
                  { icon: '🌐', label: 'Website', value: 'bestofpb.com', link: 'https://bestofpb.com', desc: 'Browse our full platform' },
                  { icon: '📍', label: 'Location', value: 'Pacific Beach, San Diego, CA', link: null, desc: 'Serving all of PB' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '18px 20px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none', display: 'block', marginBottom: 3 }}>{item.value}</a>
                      ) : (
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 3 }}>{item.value}</div>
                      )}
                      <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div style={{ background: 'var(--navy)', borderRadius: 16, padding: 24 }}>
                <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Quick answers</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Read our FAQ', href: '/faq' },
                    { label: 'View membership plans', href: '/memberships' },
                    { label: 'Nominate a business', href: '/nominations' },
                    { label: 'Submit content', href: '/submissions' },
                  ].map(link => (
                    <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {link.label}
                      <span style={{ color: 'rgba(255,255,255,0.25)' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-md)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Message sent!</h3>
                  <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: 24 }}>
                    Thanks for reaching out! Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }} className="btn btn-primary btn-md">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Send us a message</h3>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28, lineHeight: 1.6 }}>We respond to all messages within 24 hours.</p>

                  {error && (
                    <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div>
                        <label style={labelStyle}>Your Name</label>
                        <input type="text" placeholder="Alex Rivera" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address</label>
                        <input type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Subject</label>
                      <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select a subject...</option>
                        <option value="Membership question">Membership question</option>
                        <option value="Vendor inquiry">Vendor inquiry</option>
                        <option value="Package booking">Package booking</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Technical issue">Technical issue</option>
                        <option value="General question">General question</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Message</label>
                      <textarea
                        placeholder="Tell us how we can help..."
                        required
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{ width: '100%', padding: '14px 16px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 15, color: 'var(--gray-800)', background: 'var(--gray-50)', outline: 'none', fontFamily: 'inherit', minHeight: 140, resize: 'vertical', lineHeight: 1.6 }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ width: '100%', height: 52, background: loading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                      {loading ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
