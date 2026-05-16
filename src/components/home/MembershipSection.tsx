import Link from 'next/link'

const REG = ['Exclusive discounts at 50+ businesses','Digital + physical membership card','QR code verification','Two names on one card','Access to member-only events','Giftable to friends & family']
const VIP = ['Everything in Regular','VIP line status at select venues','Exclusive VIP-only deals','Gold VIP membership card','Priority event access','Limited to 200 members']

export default function MembershipSection() {
  return (
    <section style={{ padding: '64px 0', background: 'var(--navy)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 10 }}>Membership</span>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 12 }}>Join the Best of PB Club</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>One membership. Hundreds of dollars saved. Your insider pass to Pacific Beach.</p>
        </div>

        {/* Desktop: side by side */}
        <div className="mem-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, maxWidth: 820, margin: '0 auto 40px' }}>
          <RegularCard />
          <VIPCard />
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mem-mobile" style={{ display: 'none', marginBottom: 32 }}>
          <div style={{
            display: 'flex', gap: 14,
            overflowX: 'auto', scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
            paddingBottom: 12,
            margin: '0 -16px', paddingLeft: 16, paddingRight: 16,
          }}>
            <div style={{ minWidth: '85vw', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
              <RegularCard />
            </div>
            <div style={{ minWidth: '85vw', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
              <VIPCard />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>← Swipe to see VIP →</span>
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
          {[['🔒','Stripe-secured'],['📬','Physical card mailed'],['🎁','Easy gifting'],['❌','Cancel anytime']].map(([icon, text]) => (
            <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mem-desktop { display: none !important; }
          .mem-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function RegularCard() {
  return (
    <div style={{ background: 'linear-gradient(145deg,#1A2744,#0D1835)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 32 }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(96,165,250,0.6)', display: 'block', marginBottom: 18 }}>Regular Membership</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.5)', alignSelf: 'flex-start', marginTop: 8 }}>$</span>
        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>156</span>
        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)', marginLeft: 2 }}>/year</span>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>~$13/month · cancel anytime</p>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 18 }} />
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16, fontFamily: "'Bricolage Grotesque',sans-serif" }}>PB Member</h3>
      <ul style={{ listStyle: 'none', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {REG.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(96,165,250,0.15)', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link href="/memberships?tier=regular" style={{ display: 'block', textAlign: 'center', background: '#fff', color: '#0D1020', fontSize: 14, fontWeight: 700, padding: '13px', borderRadius: 12, textDecoration: 'none', marginBottom: 12 }}>
        Get Regular Membership
      </Link>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
        Gift it? <Link href="/memberships?gift=true" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Buy as a gift →</Link>
      </p>
    </div>
  )
}

function VIPCard() {
  return (
    <div style={{ background: 'linear-gradient(145deg,#2D1C00,#1A0E00)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 22, padding: 32, position: 'relative' }}>
      <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C8962A', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>⭐ Most Popular</div>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', display: 'block', marginBottom: 18 }}>VIP Membership</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 600, color: 'rgba(240,217,138,0.6)', alignSelf: 'flex-start', marginTop: 8 }}>$</span>
        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 52, fontWeight: 800, color: '#F0D98A', lineHeight: 1, letterSpacing: '-2px' }}>350</span>
        <span style={{ fontSize: 15, color: 'rgba(201,168,76,0.4)', marginLeft: 2 }}>/year</span>
      </div>
      <p style={{ fontSize: 12, color: 'rgba(201,168,76,0.4)', marginBottom: 20 }}>~$29/month · limited to 200</p>
      <div style={{ height: 1, background: 'rgba(201,168,76,0.12)', marginBottom: 18 }} />
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F0D98A', marginBottom: 16, fontFamily: "'Bricolage Grotesque',sans-serif" }}>PB VIP Member</h3>
      <ul style={{ listStyle: 'none', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {VIP.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(201,168,76,0.65)', lineHeight: 1.4 }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', color: '#C8962A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link href="/memberships?tier=vip" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#92400e,#C8962A)', color: '#fff', fontSize: 14, fontWeight: 700, padding: '13px', borderRadius: 12, textDecoration: 'none', marginBottom: 12 }}>
        Get VIP Membership
      </Link>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(201,168,76,0.3)' }}>
        Gift it? <Link href="/memberships?gift=true&tier=vip" style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'underline' }}>Buy as a gift →</Link>
      </p>
    </div>
  )
}
