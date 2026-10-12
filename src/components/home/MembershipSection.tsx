import Link from 'next/link'
import { MEMBER_PLANS, MEMBER_TRIAL_DAYS } from '@/lib/plans'

const TRIAL_MONTHS = Math.round(MEMBER_TRIAL_DAYS / 30)

export default function MembershipSection() {
  const [insider, vip] = MEMBER_PLANS
  return (
    <section style={{ padding: '64px 0', background: 'var(--navy)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 10 }}>Local Insider Club</span>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 12 }}>Join the SD Social Club</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Support local. Save local. Discover more. Save more than your membership every month while supporting San Diego businesses.
          </p>
        </div>

        <div className="mem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, maxWidth: 820, margin: '0 auto 28px' }}>
          <PlanCard plan={insider} vip={false} />
          <PlanCard plan={vip} vip />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/register" style={{ fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'underline' }}>Not ready? Join free</Link>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}> and upgrade any time.</span>
        </div>

        <div style={{ maxWidth: 820, margin: '0 auto', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Own a local business?</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Get your own landing page, Instagram features and member traffic. Plans from $99/month.</div>
          </div>
          <Link href="/memberships?for=business" style={{ background: '#fff', color: '#0D1020', fontSize: 13, fontWeight: 700, padding: '11px 18px', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap' }}>See business plans →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function PlanCard({ plan, vip }: { plan: typeof MEMBER_PLANS[number]; vip: boolean }) {
  const accent = vip ? '#F0D98A' : '#fff'
  const soft = vip ? 'rgba(201,168,76,0.65)' : 'rgba(255,255,255,0.55)'
  return (
    <div style={{ background: vip ? 'linear-gradient(145deg,#2D1C00,#1A0E00)' : 'linear-gradient(145deg,#1A2744,#0D1835)', border: `1px solid ${vip ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 22, padding: 30, position: 'relative' }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: vip ? 'rgba(201,168,76,0.7)' : 'rgba(96,165,250,0.7)', display: 'block', marginBottom: 14 }}>{plan.name}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 48, fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: '-2px' }}>${plan.price}</span>
        <span style={{ fontSize: 15, color: soft, marginLeft: 2 }}>/month</span>
      </div>
      <p style={{ fontSize: 13, fontWeight: 700, color: vip ? '#C8962A' : '#4ADE80', marginBottom: 18 }}>First {TRIAL_MONTHS} months free · cancel anytime</p>
      <ul style={{ listStyle: 'none', marginBottom: 22, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {plan.features.slice(0, 6).map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: soft, lineHeight: 1.4 }}>
            <span style={{ color: vip ? '#C8962A' : '#60A5FA', fontWeight: 800 }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <Link href={`/memberships?tier=${plan.key.toLowerCase()}`} style={{ display: 'block', textAlign: 'center', background: vip ? 'linear-gradient(135deg,#92400e,#C8962A)' : '#fff', color: vip ? '#fff' : '#0D1020', fontSize: 14, fontWeight: 700, padding: '13px', borderRadius: 12, textDecoration: 'none' }}>
        Start {TRIAL_MONTHS} months free
      </Link>
    </div>
  )
}
