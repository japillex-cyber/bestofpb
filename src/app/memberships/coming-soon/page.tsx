import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, paddingTop: 'calc(var(--nav-height) + 40px)', background: 'var(--navy)' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 14 }}>
          Memberships launching soon!
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 460, lineHeight: 1.7, marginBottom: 32 }}>
          We are setting up payment processing. Check back soon — memberships will be live shortly!
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary btn-lg">Back to Home</Link>
          <Link href="/contact" className="btn btn-outline-white btn-lg">Get Notified</Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
