'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Step = 'invite' | 'details'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('invite')
  const [inviteCode, setInviteCode] = useState('')
  const [inviteError, setInviteError] = useState('')
  const [inviteLoading, setInviteLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setInviteLoading(true)
    setInviteError('')
    const res = await fetch('/api/invite/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inviteCode }),
    })
    setInviteLoading(false)
    if (res.ok) { setStep('details') }
    else {
      const data = await res.json()
      setInviteError(data.error ?? 'Invalid invite code.')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('Passwords do not match.')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, inviteCode }),
    })
    const data = await res.json()
    if (!res.ok) { setLoading(false); return setError(data.error ?? 'Registration failed.') }
    await signIn('credentials', { email, password, callbackUrl: '/', redirect: true })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 50, padding: '0 16px',
    border: '1.5px solid #E4E7EF', borderRadius: 12,
    fontSize: 15, color: '#1A1F30', background: '#F8F9FB',
    outline: 'none', fontFamily: 'inherit',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* Left photo panel — hidden on mobile */}
      <div className="auth-photo-panel" style={{ flex: '0 0 45%', position: 'relative', overflow: 'hidden', background: '#04091C' }}>
        <img src="https://images.unsplash.com/photo-1534251369789-5067783b2dc7?w=1200&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(4,9,28,0.88) 0%,rgba(0,65,204,0.45) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 48 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, background: '#0057FF', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Pacific Beach</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
            </div>
          </Link>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16, fontWeight: 500 }}>Join 2,400+ members enjoying</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Exclusive deals at 50+ local businesses','Curated PB experience packages','Community events & nominations','Your own digital membership card'].map(perk => (
                <li key={perk} style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.85)', paddingLeft: 24, position: 'relative', fontWeight: 500 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#60A5FA', fontWeight: 700 }}>✓</span>{perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: '#fff', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Mobile logo */}
          <div className="mobile-logo" style={{ display: 'none', marginBottom: 28 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, background: '#0057FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌊</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#0D1020', lineHeight: 1 }}>Pacific Beach</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: '#0057FF', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
              </div>
            </Link>
          </div>

          {step === 'invite' ? (
            <>
              <div style={{ marginBottom: 28 }}>
                <div style={{ width: 52, height: 52, background: '#EBF0FF', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>🔐</div>
                <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: '#0D1020', letterSpacing: '-0.5px', marginBottom: 8 }}>Invite-only access</h1>
                <p style={{ fontSize: 14, color: '#6B7590', lineHeight: 1.6 }}>Best of PB is invite-only. Enter your invite code to create an account.</p>
              </div>

              {inviteError && (
                <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>⚠️ {inviteError}</div>
              )}

              <form onSubmit={verifyCode} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Invite Code</label>
                  <input type="text" placeholder="BOPB-2024-LAUNCH" value={inviteCode} onChange={e => setInviteCode(e.target.value.toUpperCase())} required autoFocus style={{ ...inputStyle, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }} />
                  <p style={{ fontSize: 12, color: '#9AA3B8', marginTop: 6 }}>💡 Try: BOPB-2024-LAUNCH</p>
                </div>
                <button type="submit" disabled={inviteLoading || !inviteCode} style={{ width: '100%', height: 52, background: inviteLoading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>
                  {inviteLoading ? 'Verifying...' : 'Verify Code →'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 13, color: '#9AA3B8' }}>Don't have a code? <a href="/contact" style={{ color: '#0057FF', fontWeight: 600 }}>Request an invite</a></p>
                <p style={{ fontSize: 13, color: '#9AA3B8' }}>Already have an account? <Link href="/login" style={{ color: '#0057FF', fontWeight: 600 }}>Sign in</Link></p>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E8F5EE', color: '#0B7A4B', fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 999, marginBottom: 14 }}>✓ Invite code verified</div>
                <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: '#0D1020', letterSpacing: '-0.5px', marginBottom: 8 }}>Create your account</h1>
                <p style={{ fontSize: 14, color: '#6B7590' }}>Already have one? <Link href="/login" style={{ color: '#0057FF', fontWeight: 600 }}>Sign in</Link></p>
              </div>

              {error && (
                <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>⚠️ {error}</div>
              )}

              <button onClick={() => signIn('google', { callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', height: 50, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#2E3448', fontFamily: 'inherit', cursor: 'pointer', marginBottom: 16 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17.64 9.2C17.64 8.57 17.58 7.96 17.47 7.38H9V10.85H13.84C13.635 11.97 12.99 12.915 12.045 13.565V15.82H14.955C16.66 14.245 17.64 11.93 17.64 9.2Z" fill="#4285F4"/><path d="M9 18C11.43 18 13.465 17.195 14.955 15.82L12.045 13.565C11.24 14.105 10.21 14.42 9 14.42C6.655 14.42 4.67 12.835 3.965 10.71H0.955V13.04C2.44 15.99 5.48 18 9 18Z" fill="#34A853"/><path d="M3.965 10.71C3.785 10.17 3.68 9.595 3.68 9C3.68 8.405 3.785 7.83 3.965 7.29V4.96H0.955C0.345 6.18 0 7.555 0 9C0 10.445 0.345 11.82 0.955 13.04L3.965 10.71Z" fill="#FBBC05"/><path d="M9 3.58C10.325 3.58 11.52 4.035 12.455 4.92L15.02 2.355C13.46 0.9 11.425 0 9 0C5.48 0 2.44 2.01 0.955 4.96L3.965 7.29C4.67 5.165 6.655 3.58 9 3.58Z" fill="#EA4335"/></svg>
                Sign up with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: '#E4E7EF' }} />
                <span style={{ fontSize: 12, color: '#9AA3B8' }}>or create with email</span>
                <div style={{ flex: 1, height: 1, background: '#E4E7EF' }} />
              </div>

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Full Name</label>
                  <input type="text" placeholder="Alex Rivera" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Password</label>
                  <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Confirm Password</label>
                  <input type="password" placeholder="Repeat password" value={confirm} onChange={e => setConfirm(e.target.value)} required style={inputStyle} />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', height: 52, background: loading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginTop: 4 }}>
                  {loading ? 'Creating account...' : 'Create Account 🎉'}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontSize: 12, color: '#9AA3B8', marginTop: 16, lineHeight: 1.6 }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" style={{ color: '#0057FF' }}>Terms</Link> and{' '}
                <Link href="/privacy" style={{ color: '#0057FF' }}>Privacy Policy</Link>.
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
