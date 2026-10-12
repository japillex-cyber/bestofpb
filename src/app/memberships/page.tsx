'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MEMBER_PLANS, BUSINESS_PLANS, MEMBER_TRIAL_DAYS } from '@/lib/plans'

const TRIAL_MONTHS = Math.round(MEMBER_TRIAL_DAYS / 30)

type Audience = 'locals' | 'business'

const LOCAL_FAQS = [
  { q: 'Is it really free to join?', a: 'Yes. Anyone can create a free account. To unlock member deals, promo codes and perks, choose Local Insider or VIP Local Pass — and your first 3 months are free.' },
  { q: 'When will I be charged?', a: `Nothing is charged during your ${TRIAL_MONTHS} free months. After that it’s billed monthly. Cancel any time before then and you won’t pay a thing.` },
  { q: 'How do I use my membership?', a: 'Open your digital card in your dashboard and show it at participating businesses. Member-only specials are unlocked on every business page while you’re signed in.' },
  { q: 'Can I switch between Local Insider and VIP?', a: 'Yes, upgrade or downgrade any time from this page. Changes are prorated automatically.' },
  { q: 'How do I cancel?', a: 'From your dashboard, open “Billing & cancel”. Your membership stays active until the end of the period you’ve paid for.' },
]

const BUSINESS_FAQS = [
  { q: 'What do I get for free?', a: 'A free business account so we can get to know you. Your public landing page, directory listing and Instagram features start when you choose a paid plan.' },
  { q: 'What is founding member pricing?', a: 'Businesses that join during launch lock in today’s monthly price for as long as they stay subscribed.' },
  { q: 'Can I update my special myself?', a: 'Yes. Log in to your business dashboard any time to change your offer, hours, photos and links.' },
  { q: 'Why have a landing page if I’m already on Instagram?', a: 'Instagram posts disappear from feeds. Your page is indexed by Google, so customers can find you outside Instagram — with your hours, specials, events, booking links and our collabs all in one place.' },
  { q: 'Is there a contract?', a: 'No. Plans are month to month and you can cancel any time.' },
]

export default function MembershipsPage() {
  const { data: session, status } = useSession()
  const [audience, setAudience] = useState<Audience>('locals')
  const [highlight, setHighlight] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const loggedIn = status === 'authenticated'
  const role = (session?.user as any)?.role

  const checkoutMember = async (tier: string) => {
    if (!loggedIn) { window.location.href = `/register?type=member&tier=${tier.toLowerCase()}`; return }
    setLoading(tier); setError('')
    try {
      const res = await fetch('/api/memberships/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier }) })
      const data = await res.json()
      if (data.url) { window.location.href = data.url; return }
      if (data.error === 'AUTH_REQUIRED') { window.location.href = `/login?callbackUrl=${encodeURIComponent(`/memberships?tier=${tier.toLowerCase()}&start=1`)}`; return }
      setError(data.error ?? 'Something went wrong. Please try again.')
    } catch { setError('Something went wrong. Please try again.') }
    setLoading(null)
  }

  const checkoutBusiness = async (plan: string) => {
    if (!loggedIn) { window.location.href = `/register?type=business&plan=${plan}`; return }
    setLoading(plan); setError('')
    try {
      const res = await fetch('/api/business/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) })
      const data = await res.json()
      if (data.url) { window.location.href = data.url; return }
      if (data.error === 'NO_BUSINESS') { window.location.href = `/business?plan=${plan}`; return }
      setError(data.error ?? 'Something went wrong. Please try again.')
    } catch { setError('Something went wrong. Please try again.') }
    setLoading(null)
  }

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    if (sp.get('for') === 'business' || sp.get('plan')) setAudience('business')
    const tier = (sp.get('tier') ?? '').toUpperCase()
    if (tier === 'INSIDER' || tier === 'VIP') setHighlight(tier)
    if (sp.get('plan')) setHighlight(sp.get('plan')!.toUpperCase())
  }, [])

  // Coming back from sign-up with ?start=1 continues straight to checkout.
  useEffect(() => {
    if (status !== 'authenticated') return
    const sp = new URLSearchParams(window.location.search)
    const tier = (sp.get('tier') ?? '').toUpperCase()
    if (sp.get('start') === '1' && (tier === 'INSIDER' || tier === 'VIP')) {
      window.history.replaceState(null, '', '/memberships')
      checkoutMember(tier)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const faqs = audience === 'locals' ? LOCAL_FAQS : BUSINESS_FAQS

  return (
    <>
      <Navbar />

      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '56px 16px 44px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Membership</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 14, lineHeight: 1.1 }}>
            {audience === 'locals' ? 'Join the SD Social Club' : 'Grow with Best of PB'}
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
            {audience === 'locals'
              ? 'Support local. Save local. Discover more. Save more than your membership every month while supporting local businesses.'
              : 'From the team behind @pacific.beach and @sandiegofree — a trusted local hub where our audience discovers, revisits and supports your business.'}
          </p>
          <div role="tablist" style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: 4 }}>
            {([['locals', 'For locals'], ['business', 'For businesses']] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={audience === k} onClick={() => { setAudience(k); setOpenFaq(null) }} style={{ border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', background: audience === k ? '#fff' : 'transparent', color: audience === k ? '#0D1020' : 'rgba(255,255,255,0.65)' }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)' }}>
        <div className="container" style={{ padding: '40px 16px 30px' }}>
          {error && <div style={{ maxWidth: 680, margin: '0 auto 20px', background: '#FEE2E2', color: '#B91C1C', borderRadius: 12, padding: '12px 16px', fontSize: 14, textAlign: 'center' }}>{error}</div>}

          {audience === 'locals' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(290px, 100%), 1fr))', gap: 20, maxWidth: 1040, margin: '0 auto' }}>
              <PlanCard
                eyebrow="Free account" title="Community" price="$0" sub="Forever free"
                features={['Browse local businesses & guides', 'Read the blog & see events', 'Enter public giveaways', 'Upgrade any time']}
                cta={loggedIn ? 'You’re in' : 'Join free'} disabled={loggedIn}
                onClick={() => { window.location.href = '/register?type=member' }}
              />
              {MEMBER_PLANS.map(p => (
                <PlanCard
                  key={p.key}
                  eyebrow={p.name} title={p.key === 'VIP' ? 'VIP Local Pass' : 'Local Insider'} price={`$${p.price}`} sub="/month"
                  badge={`First ${TRIAL_MONTHS} months free`}
                  tagline={p.tagline}
                  features={p.features}
                  dark={p.key === 'VIP'}
                  selected={highlight === p.key}
                  cta={loading === p.key ? 'One moment…' : `Start ${TRIAL_MONTHS} months free`}
                  onClick={() => checkoutMember(p.key)}
                  disabled={!!loading}
                />
              ))}
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 18, maxWidth: 1180, margin: '0 auto' }}>
                <PlanCard
                  eyebrow="Free account" title="Get started" price="$0" sub="No card needed"
                  features={['Create your business account', 'Build your page privately', 'Hear about launch offers first', 'Go live when you pick a plan']}
                  cta={role === 'VENDOR' ? 'Go to my business' : 'Join free'}
                  onClick={() => { window.location.href = role === 'VENDOR' ? '/business' : loggedIn ? '/business' : '/register?type=business' }}
                />
                {BUSINESS_PLANS.map(p => (
                  <PlanCard
                    key={p.key}
                    eyebrow={p.tagline} title={p.name} price={`$${p.price}`} sub="/month"
                    features={p.features}
                    dark={p.highlight}
                    badge={p.highlight ? 'Most exposure' : undefined}
                    selected={highlight === p.key}
                    cta={loading === p.key ? 'One moment…' : `Choose ${p.name}`}
                    onClick={() => checkoutBusiness(p.key)}
                    disabled={!!loading}
                  />
                ))}
              </div>

              <div style={{ maxWidth: 1180, margin: '34px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 14 }}>
                {[
                  ['🔒', 'Founding member pricing', 'Lock in launch pricing for as long as you stay.'],
                  ['🔎', 'Found on Google, not just Instagram', 'Your own indexed landing page helps customers discover you outside Instagram.'],
                  ['🗺️', 'Community guides', 'Be included in guides like Best Happy Hour, Dog Friendly Patios, Date Night and Brunch.'],
                  ['🏷️', 'Specials that bring people in', 'Run offers like “show this page for 10% off” and update them whenever you want.'],
                ].map(([icon, title, text]) => (
                  <div key={title} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: 18 }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>{text}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)', marginTop: 26 }}>🔒 Secure payments by Stripe · Cancel anytime</p>
        </div>

        <div className="container" style={{ padding: '20px 16px 80px', maxWidth: 760 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, textAlign: 'center', marginBottom: 22 }}>Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, i) => (
              <div key={faq.q} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', fontSize: 15, fontWeight: 600, color: 'var(--gray-900)' }}>
                  {faq.q}
                  <span style={{ fontSize: 20, color: 'var(--gray-400)', marginLeft: 12, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && <div style={{ padding: '0 20px 16px', fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
          {audience === 'business' && (
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--gray-500)', marginTop: 22 }}>
              Want to talk first? <Link href="/contact" style={{ color: 'var(--blue)', fontWeight: 700 }}>Get in touch</Link>
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

function PlanCard({ eyebrow, title, price, sub, badge, tagline, features, cta, onClick, dark, selected, disabled }: {
  eyebrow: string; title: string; price: string; sub: string; badge?: string; tagline?: string
  features: string[]; cta: string; onClick: () => void; dark?: boolean; selected?: boolean; disabled?: boolean
}) {
  const fg = dark ? '#fff' : 'var(--gray-900)'
  const soft = dark ? 'rgba(255,255,255,0.65)' : 'var(--gray-600)'
  return (
    <div style={{ background: dark ? 'linear-gradient(160deg,#0D1835,#04091C)' : '#fff', border: `2px solid ${selected ? '#0057FF' : dark ? 'transparent' : 'var(--gray-200)'}`, borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', boxShadow: selected ? '0 10px 30px rgba(0,87,255,0.18)' : 'var(--shadow-sm)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: dark ? '#60A5FA' : 'var(--blue)', marginBottom: 8 }}>{eyebrow}</div>
      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, color: fg }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '10px 0 4px' }}>
        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 40, fontWeight: 800, color: fg, letterSpacing: '-1px' }}>{price}</span>
        <span style={{ fontSize: 14, color: soft }}>{sub}</span>
      </div>
      {badge && <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, color: dark ? '#0D1020' : '#0B7A4B', background: dark ? '#F0D98A' : '#E8F5EE', padding: '4px 10px', borderRadius: 999, marginBottom: 10 }}>{badge}</div>}
      {tagline && <p style={{ fontSize: 13, color: soft, lineHeight: 1.5, marginBottom: 12 }}>{tagline}</p>}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, margin: '6px 0 20px', flex: 1 }}>
        {features.map(f => (
          <li key={f} style={{ display: 'flex', gap: 9, fontSize: 13, color: soft, lineHeight: 1.45 }}>
            <span style={{ color: dark ? '#60A5FA' : 'var(--blue)', fontWeight: 800 }}>✓</span>{f}
          </li>
        ))}
      </ul>
      <button onClick={onClick} disabled={disabled} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: disabled ? 'default' : 'pointer', background: dark ? '#fff' : '#0057FF', color: dark ? '#0D1020' : '#fff', opacity: disabled ? 0.6 : 1 }}>
        {cta}
      </button>
    </div>
  )
}
