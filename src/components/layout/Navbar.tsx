'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const transparent = isHome && !scrolled

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
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 40, height: 40, background: 'var(--blue)', borderRadius: 11,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Pacific Beach</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--blue)', letterSpacing: '2px', textTransform: 'uppercase' }}>Best of PB</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{
                fontSize: 13, fontWeight: 500, padding: '8px 12px', borderRadius: 8,
                color: pathname === link.href ? '#fff' : 'rgba(255,255,255,0.55)',
                background: pathname === link.href ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'all 0.15s',
              }}>{link.label}</Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/login" className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>Log in</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Join Free</Link>
          </div>
        </div>
      </header>

      {/* Mobile menu placeholder */}
    </>
  )
}
