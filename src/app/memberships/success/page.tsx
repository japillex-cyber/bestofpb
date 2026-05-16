import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, paddingTop: 'calc(var(--nav-height) + 40px)', background: 'var(--navy)' }}>
        <div style={{ width: 80, height: 80, background: 'rgba(74,222,128,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 24 }}>✅</div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 14 }}>
          Welcome to Best of PB! 🎉
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 460, lineHeight: 1.7, marginBottom: 8 }}>
          Your membership is now active. Your physical card will arrive in 5–7 business days.
        </p>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 36 }}>
          Check your email for your welcome message and digital card.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/membership-card" className="btn btn-primary btn-lg">View My Card</Link>
          <Link href="/shop-local" className="btn btn-outline-white btn-lg">Start Exploring Deals</Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
