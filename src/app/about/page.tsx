import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const TEAM = [
  { name: 'Jordan Rivera', role: 'Founder & CEO', emoji: '🌊', bio: 'Born and raised in Pacific Beach. Started BOPB to connect locals with the best hidden gems in the neighborhood.' },
  { name: 'Alex Chen', role: 'Head of Partnerships', emoji: '🤝', bio: 'Works directly with local businesses to curate the best deals and experiences for BOPB members.' },
  { name: 'Sam Torres', role: 'Community Manager', emoji: '📸', bio: 'Runs @thebestofpb Instagram and manages the BOPB community events and nominations program.' },
]

const VALUES = [
  { icon: '🏖️', title: 'Local First', desc: 'Everything we do supports Pacific Beach businesses, artists, and creators. We believe in keeping dollars in the community.' },
  { icon: '🤝', title: 'Community Driven', desc: 'Our nominations, polls, and submissions are all community-powered. The people of PB decide what gets featured.' },
  { icon: '✨', title: 'Quality Curated', desc: 'We personally vet every vendor and experience. If it\'s on BOPB, it has earned its place.' },
  { icon: '💎', title: 'Member Value', desc: 'Every feature we build, every deal we negotiate, is designed to make your membership worth 10x what you paid.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,87,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', padding: '72px 24px 64px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Our Story</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,5vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 18, lineHeight: 1.1 }}>
            Born in Pacific Beach.<br />Built for Pacific Beach.
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 540, margin: '0 auto', lineHeight: 1.8 }}>
            Best of PB started as a passion project by a group of PB locals who were tired of seeing amazing local businesses go undiscovered while tourists flocked to the same chain spots.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div style={{ background: '#fff', padding: '72px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', maxWidth: 960, margin: '0 auto' }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 12 }}>How it started</span>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 20, lineHeight: 1.2 }}>
                The neighborhood deserved something better
              </h2>
              <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: 16 }}>
                In 2022, our founder Jordan Rivera was sitting at a local taco stand watching tourists walk right past it to a chain restaurant two doors down. That moment sparked an idea.
              </p>
              <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: 16 }}>
                What if there was a membership program that gave locals real incentives to explore and support the best businesses in Pacific Beach? What if the community itself decided what got featured?
              </p>
              <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.85, marginBottom: 28 }}>
                Best of PB launched in 2022 with 12 vendor partners and 50 founding members. Today we have 50+ partners, 2,400+ members, and a community that genuinely loves their neighborhood.
              </p>
              <Link href="/memberships" className="btn btn-primary btn-lg">Join the Community</Link>
            </div>

            {/* Stats visual */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { n: '2022', l: 'Founded', icon: '📅', color: '#EBF0FF' },
                { n: '50+', l: 'Local Partners', icon: '🏪', color: '#E8F5EE' },
                { n: '2,400+', l: 'Members', icon: '👥', color: '#FEF3C7' },
                { n: '$200+', l: 'Avg Monthly Savings', icon: '💰', color: '#EBF0FF' },
              ].map(stat => (
                <div key={stat.l} style={{ background: stat.color, borderRadius: 18, padding: '28px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{stat.icon}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-1px', lineHeight: 1 }}>{stat.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 6, fontWeight: 500 }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: 'var(--gray-50)', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 12 }}>What we believe</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ background: '#fff', padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 12 }}>The People</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>Meet the Team</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 18, padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px' }}>{member.emoji}</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 14, letterSpacing: '-0.5px' }}>Ready to explore PB?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.7 }}>Join 2,400+ members who have made Best of PB their insider guide to Pacific Beach.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/memberships" className="btn btn-primary btn-lg">Get Membership</Link>
            <Link href="/contact" className="btn btn-outline-white btn-lg">Contact Us</Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
