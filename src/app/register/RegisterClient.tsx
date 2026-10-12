'use client'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

type AccountType = 'member' | 'business'

const PERKS: Record<AccountType, string[]> = {
  member: ['Free to join — upgrade any time', 'Exclusive deals at local San Diego businesses', 'Giveaways, events & insider recommendations', 'First 3 months of membership free'],
  business: ['Free to join — no card needed', 'Your own landing page on Best of PB', 'Features on @pacific.beach & @sandiegofree', 'Founding partner pricing for early businesses'],
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }
const inputStyle: React.CSSProperties = { width: '100%', height: 50, padding: '0 16px', border: '1.5px solid #E4E7EF', borderRadius: 12, fontSize: 15, color: '#1A1F30', background: '#F8F9FB', outline: 'none', fontFamily: 'inherit' }

export default function RegisterClient({ initialType, plan, tier, code }: { initialType: AccountType | null; plan: string; tier: string; code: string }) {
  const [type, setType] = useState<AccountType | null>(initialType)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [instagramHandle, setInstagramHandle] = useState('')
  const [website, setWebsite] = useState('')
  const [inviteCode, setInviteCode] = useState(code)
  const [categories, setCategories] = useState<{ id: string; name: string; icon: string | null }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (type === 'business' && categories.length === 0) {
      fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories ?? [])).catch(() => {})
    }
  }, [type, categories.length])

  // Where to go after signing up.
  const nextUrl = type === 'business'
    ? `/business${plan ? `?plan=${encodeURIComponent(plan)}` : ''}`
    : tier ? `/memberships?tier=${encodeURIComponent(tier)}&start=1` : '/dashboard'

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountType: type, name, email, phone, password, inviteCode, businessName, categoryId, instagramHandle, website }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) { setLoading(false); return setError(data.error ?? 'Registration failed.') }
    await signIn('credentials', { email, password, callbackUrl: nextUrl, redirect: true })
  }

  const perks = PERKS[type ?? 'member']

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <div className="auth-photo-panel" style={{ flex: '0 0 45%', position: 'relative', overflow: 'hidden', background: '#04091C' }}>
        <img src="https://images.unsplash.com/photo-1534251369789-5067783b2dc7?w=1200&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(4,9,28,0.88) 0%,rgba(0,65,204,0.45) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 48 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, background: '#0057FF', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1 }}>San Diego</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
            </div>
          </Link>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16, fontWeight: 500 }}>{type === 'business' ? 'For local businesses' : 'Join the SD Social Club'}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {perks.map(perk => (
                <li key={perk} style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.85)', paddingLeft: 24, position: 'relative', fontWeight: 500 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#60A5FA', fontWeight: 700 }}>✓</span>{perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: '#fff', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div className="mobile-logo" style={{ display: 'none', marginBottom: 28 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, background: '#0057FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌊</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#0D1020', lineHeight: 1 }}>San Diego</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: '#0057FF', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
              </div>
            </Link>
          </div>

          {type === null ? (
            <>
              <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: '#0D1020', letterSpacing: '-0.5px', marginBottom: 8 }}>Join free</h1>
              <p style={{ fontSize: 14, color: '#6B7590', marginBottom: 24 }}>Who are you joining as?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {([
                  ['member', '🌴', 'I’m a local', 'Get deals, giveaways and insider picks. Join the SD Social Club.'],
                  ['business', '🏪', 'I own a business', 'Get your own page and reach locals through our Instagram.'],
                ] as const).map(([key, icon, title, sub]) => (
                  <button key={key} onClick={() => setType(key)} style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', padding: '18px 18px', border: '1.5px solid #E4E7EF', borderRadius: 14, background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <span style={{ fontSize: 28 }}>{icon}</span>
                    <span>
                      <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#0D1020' }}>{title}</span>
                      <span style={{ display: 'block', fontSize: 13, color: '#6B7590', marginTop: 2 }}>{sub}</span>
                    </span>
                  </button>
                ))}
              </div>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#9AA3B8', marginTop: 22 }}>Already have an account? <Link href="/login" style={{ color: '#0057FF', fontWeight: 600 }}>Sign in</Link></p>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 22 }}>
                <button onClick={() => setType(null)} style={{ background: 'none', border: 'none', color: '#6B7590', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 12, fontFamily: 'inherit' }}>← Change</button>
                <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: '#0D1020', letterSpacing: '-0.5px', marginBottom: 6 }}>
                  {type === 'business' ? 'List your business — free' : 'Join the SD Social Club'}
                </h1>
                <p style={{ fontSize: 14, color: '#6B7590' }}>
                  {type === 'business' ? 'Create your free account. Pick a plan when you’re ready to go live.' : 'Free account. Upgrade for deals and perks — first 3 months free.'}
                </p>
              </div>

              {error && <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 18 }}>⚠️ {error}</div>}

              {type === 'member' && (
                <>
                  <button onClick={() => signIn('google', { callbackUrl: nextUrl })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', height: 50, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#2E3448', fontFamily: 'inherit', cursor: 'pointer', marginBottom: 16 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17.64 9.2C17.64 8.57 17.58 7.96 17.47 7.38H9V10.85H13.84C13.635 11.97 12.99 12.915 12.045 13.565V15.82H14.955C16.66 14.245 17.64 11.93 17.64 9.2Z" fill="#4285F4"/><path d="M9 18C11.43 18 13.465 17.195 14.955 15.82L12.045 13.565C11.24 14.105 10.21 14.42 9 14.42C6.655 14.42 4.67 12.835 3.965 10.71H0.955V13.04C2.44 15.99 5.48 18 9 18Z" fill="#34A853"/><path d="M3.965 10.71C3.785 10.17 3.68 9.595 3.68 9C3.68 8.405 3.785 7.83 3.965 7.29V4.96H0.955C0.345 6.18 0 7.555 0 9C0 10.445 0.345 11.82 0.955 13.04L3.965 10.71Z" fill="#FBBC05"/><path d="M9 3.58C10.325 3.58 11.52 4.035 12.455 4.92L15.02 2.355C13.46 0.9 11.425 0 9 0C5.48 0 2.44 2.01 0.955 4.96L3.965 7.29C4.67 5.165 6.655 3.58 9 3.58Z" fill="#EA4335"/></svg>
                    Sign up with Google
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1, height: 1, background: '#E4E7EF' }} />
                    <span style={{ fontSize: 12, color: '#9AA3B8' }}>or with email</span>
                    <div style={{ flex: 1, height: 1, background: '#E4E7EF' }} />
                  </div>
                </>
              )}

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {type === 'business' && (
                  <>
                    <div><label style={labelStyle}>Business name</label><input value={businessName} onChange={e => setBusinessName(e.target.value)} required style={inputStyle} /></div>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required style={inputStyle}>
                        <option value="">{categories.length ? 'Choose a category…' : 'Loading…'}</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div><label style={labelStyle}>Instagram</label><input value={instagramHandle} onChange={e => setInstagramHandle(e.target.value)} placeholder="@yourbiz" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Website</label><input value={website} onChange={e => setWebsite(e.target.value)} placeholder="yourbiz.com" style={inputStyle} /></div>
                    </div>
                  </>
                )}
                <div><label style={labelStyle}>{type === 'business' ? 'Your name' : 'Full name'}</label><input value={name} onChange={e => setName(e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Phone <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500 }}>(optional)</span></label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Password</label><input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Invite or referral code <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500 }}>(optional)</span></label><input value={inviteCode} onChange={e => setInviteCode(e.target.value.toUpperCase())} style={{ ...inputStyle, textTransform: 'uppercase' }} /></div>
                <button type="submit" disabled={loading} style={{ width: '100%', height: 52, background: loading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginTop: 4 }}>
                  {loading ? 'Creating account...' : type === 'business' ? 'Create free business account' : 'Join free 🎉'}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontSize: 12, color: '#9AA3B8', marginTop: 16, lineHeight: 1.6 }}>
                By joining you agree to our <Link href="/terms" style={{ color: '#0057FF' }}>Terms</Link> and <Link href="/privacy" style={{ color: '#0057FF' }}>Privacy Policy</Link>.
                <br />Already have an account? <Link href="/login" style={{ color: '#0057FF', fontWeight: 600 }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-photo-panel { display: none !important; }
          .mobile-logo { display: block !important; }
        }
      `}</style>
    </div>
  )
}
