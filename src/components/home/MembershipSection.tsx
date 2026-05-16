import Link from 'next/link'

const REG = ['Exclusive discounts at 50+ businesses','Digital + physical membership card','QR code verification','Two names on one card','Access to member-only events','Giftable to friends & family']
const VIP = ['Everything in Regular','VIP line status at select venues','Exclusive VIP-only deals','Gold VIP membership card','Priority event access','Limited to 200 members']

export default function MembershipSection() {
  return (
    <section className="section-navy">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <span className="section-eyebrow section-eyebrow-inv">Membership</span>
          <h2 className="section-title" style={{ color: '#fff' }}>Join the Best of PB Club</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.4)', margin: '0 auto' }}>
            One membership. Hundreds of dollars saved every month. Your insider pass to Pacific Beach.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 820, margin: '0 auto 48px' }}>
          {/* Regular */}
          <div style={{ background: 'linear-gradient(145deg,#1A2744,#0D1835)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 36 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(96,165,250,0.6)', display: 'block', marginBottom: 20 }}>Regular Membership</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.6)', alignSelf: 'flex-start', marginTop: 8 }}>$</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>156</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', marginLeft: 2 }}>/year</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>~$13/month · cancel anytime</p>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 20px' }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 18 }}>PB Member</h3>
            <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {REG.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(96,165,250,0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/memberships?tier=regular" className="btn btn-white btn-lg" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>Get Regular Membership</Link>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 12 }}>
              Want to gift? <Link href="/memberships?gift=true" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'underline' }}>Buy as a gift →</Link>
            </p>
          </div>

          {/* VIP */}
          <div style={{ background: 'linear-gradient(145deg,#2D1C00,#1A0E00)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 22, padding: 36, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>⭐ Most Popular</div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', display: 'block', marginBottom: 20 }}>VIP Membership</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 600, color: 'rgba(240,217,138,0.7)', alignSelf: 'flex-start', marginTop: 8 }}>$</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 56, fontWeight: 800, color: '#F0D98A', lineHeight: 1, letterSpacing: '-2px' }}>350</span>
              <span style={{ fontSize: 16, color: 'rgba(201,168,76,0.4)', marginLeft: 2 }}>/year</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(201,168,76,0.4)', marginBottom: 20 }}>~$29/month · limited to 200 members</p>
            <div style={{ height: 1, background: 'rgba(201,168,76,0.12)', margin: '0 0 20px' }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F0D98A', marginBottom: 18 }}>PB VIP Member</h3>
            <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {VIP.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(201,168,76,0.65)', lineHeight: 1.4 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', color: '#C8962A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/memberships?tier=vip" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>Get VIP Membership</Link>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(201,168,76,0.3)', marginTop: 12 }}>
              Want to gift? <Link href="/memberships?gift=true&tier=vip" style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'underline' }}>Buy as a gift →</Link>
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 36 }}>
          {[['🔒','Stripe-secured payments'],['📬','Physical card mailed to you'],['🎁','Gift to anyone, anywhere'],['❌','Cancel anytime, no hassle']].map(([icon,text]) => (
            <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
