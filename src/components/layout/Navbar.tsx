'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Shop Local',  href: '/shop-local' },
  { label: 'Events',      href: '/events' },
  { label: 'Packages',    href: '/packages' },
  { label: 'Memberships', href: '/memberships' },
  { label: 'Submissions', href: '/submissions' },
  { label: 'Store',       href: '/store' },
]

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const transparent = isHome && !scrolled
  const user = session?.user as any

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-height)',
        background: transparent ? 'transparent' : 'rgba(4,9,28,0.97)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 16px',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, background: 'var(--blue)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Pacific Beach</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: 'var(--blue)', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 1 }} className="desk-nav">
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{ fontSize: 13, fontWeight: 500, padding: '7px 10px', borderRadius: 8, color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.55)', background: pathname === link.href ? 'rgba(255,255,255,0.08)' : 'transparent', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {session ? (
                <>
                  <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, border: '2px solid rgba(255,255,255,0.2)' }}>
                      {user?.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{user?.name?.split(' ')[0]}</span>
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link href="/admin" style={{ background: '#EF4444', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 6, textDecoration: 'none', letterSpacing: '0.3px' }}>ADMIN</Link>
                  )}
                  <button onClick={() => signOut({ callbackUrl: '/' })} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, padding: '7px 14px', borderRadius: 8, textDecoration: 'none' }}>Log in</Link>
                  <Link href="/register" style={{ background: 'var(--blue)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 8, textDecoration: 'none' }}>Join Free</Link>
                </>
              )}
            </div>

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="burger"
              aria-label="Toggle menu"
              style={{ flexDirection: 'column', gap: 4, padding: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, cursor: 'pointer', display: 'none' }}
            >
              <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div style={{ background: 'rgba(4,9,28,0.99)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '8px 16px 20px', maxHeight: '85vh', overflowY: 'auto' }}>
            {session && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0 14px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 4 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>
                  {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{user?.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{user?.email}</div>
                </div>
              </div>
            )}

            {LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', fontSize: 15, fontWeight: 500, color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {link.label}
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>›</span>
              </Link>
            ))}

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {session ? (
                <>
                  <Link href="/dashboard" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, fontWeight: 600, padding: '13px', borderRadius: 10, textDecoration: 'none' }}>
                    👤 My Dashboard
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link href="/admin" style={{ display: 'block', textAlign: 'center', background: '#EF4444', color: '#fff', fontSize: 14, fontWeight: 700, padding: '13px', borderRadius: 10, textDecoration: 'none' }}>
                      🔧 Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, padding: '13px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" style={{ display: 'block', textAlign: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 15, fontWeight: 600, padding: '13px', borderRadius: 10, textDecoration: 'none' }}>Log In</Link>
                  <Link href="/register" style={{ display: 'block', textAlign: 'center', background: 'var(--blue)', color: '#fff', fontSize: 15, fontWeight: 700, padding: '13px', borderRadius: 10, textDecoration: 'none' }}>Join Free 🎉</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 860px) {
          .desk-nav { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
