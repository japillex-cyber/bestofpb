'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push('/')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      {/* Left — beach photo */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#04091C' }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
          alt="Pacific Beach"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(4,9,28,0.85) 0%,rgba(0,65,204,0.4) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 48 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, background: '#0057FF', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Pacific Beach</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
            </div>
          </Link>
          {/* Quote */}
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 400, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, fontStyle: 'italic', maxWidth: 320 }}>
            "Your all-in-one guide to the best of Pacific Beach."
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, color: '#0D1020', letterSpacing: '-0.5px', marginBottom: 8 }}>Welcome back</h1>
            <p style={{ fontSize: 14, color: '#6B7590' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: '#0057FF', fontWeight: 600 }}>Sign up free</Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#FEE2E2', border: '1px solid rgba(185,28,28,0.2)', color: '#B91C1C', fontSize: 13.5, padding: '12px 14px', borderRadius: 10, marginBottom: 20 }}>
              ⚠️ {error}
            </div>
          )}

          {/* Social buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', height: 48, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#2E3448', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2C17.64 8.57 17.58 7.96 17.47 7.38H9V10.85H13.84C13.635 11.97 12.99 12.915 12.045 13.565V15.82H14.955C16.66 14.245 17.64 11.93 17.64 9.2Z" fill="#4285F4"/>
                <path d="M9 18C11.43 18 13.465 17.195 14.955 15.82L12.045 13.565C11.24 14.105 10.21 14.42 9 14.42C6.655 14.42 4.67 12.835 3.965 10.71H0.955V13.04C2.44 15.99 5.48 18 9 18Z" fill="#34A853"/>
                <path d="M3.965 10.71C3.785 10.17 3.68 9.595 3.68 9C3.68 8.405 3.785 7.83 3.965 7.29V4.96H0.955C0.345 6.18 0 7.555 0 9C0 10.445 0.345 11.82 0.955 13.04L3.965 10.71Z" fill="#FBBC05"/>
                <path d="M9 3.58C10.325 3.58 11.52 4.035 12.455 4.92L15.02 2.355C13.46 0.9 11.425 0 9 0C5.48 0 2.44 2.01 0.955 4.96L3.965 7.29C4.67 5.165 6.655 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => signIn('facebook', { callbackUrl: '/' })}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', height: 48, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#2E3448', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              <span style={{ width: 20, height: 20, background: '#1877F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', fontWeight: 800 }}>f</span>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: '#E4E7EF' }} />
            <span style={{ fontSize: 12, color: '#9AA3B8' }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: '#E4E7EF' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', height: 48, padding: '0 16px', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 15, color: '#1A1F30', background: '#F8F9FB', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
                <a href="/forgot-password" style={{ fontSize: 13, color: '#0057FF' }}>Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', height: 48, padding: '0 16px', border: '1.5px solid #E4E7EF', borderRadius: 10, fontSize: 15, color: '#1A1F30', background: '#F8F9FB', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{ width: '100%', height: 50, background: loading ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#9AA3B8', marginTop: 20, lineHeight: 1.6 }}>
            By continuing, you agree to our{' '}
            <Link href="/terms" style={{ color: '#0057FF' }}>Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: '#0057FF' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
