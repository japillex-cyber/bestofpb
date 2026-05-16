import Link from 'next/link'

const COLS = {
  Explore:    [['Shop Local','/shop-local'],['Events','/events'],['Packages','/packages'],['Store','/store']],
  Community:  [['Submissions','/submissions'],['Nominations','/nominations'],['Polls','/polls'],['Giveaway','/giveaway'],['Blog','/blog']],
  Membership: [['Join Now','/memberships'],['Gift a Membership','/memberships?gift=true'],['My Card','/membership-card'],['FAQ','/faq']],
  Company:    [['About Us','/about'],['Contact','/contact'],['Privacy','/privacy'],['Terms','/terms']],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', padding: '64px 0 28px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, background: 'var(--blue)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🌊</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 700, color: '#fff' }}>Pacific Beach</div>
                <div style={{ fontSize: 9, color: 'var(--blue)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Best of PB</div>
              </div>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', lineHeight: 1.7, maxWidth: 220 }}>
              Your insider guide to the best businesses, events, and experiences in Pacific Beach, San Diego.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer"
                style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>📸</a>
              <a href="https://facebook.com/bestofpb" target="_blank" rel="noopener noreferrer"
                style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>👍</a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16, fontFamily: 'inherit' }}>{title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([label, href]) => (
                  <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', transition: 'color 0.15s' }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>© {new Date().getFullYear()} Best of PB. All rights reserved. Pacific Beach, San Diego, CA.</p>
          <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.25)' }}>@thebestofpb</a>
        </div>
      </div>
    </footer>
  )
}
