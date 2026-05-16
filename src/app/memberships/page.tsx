'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const PLANS = [
  {
    id: 'regular',
    name: 'Regular Membership',
    tier: 'REGULAR',
    price: 156,
    monthly: 13,
    color: 'linear-gradient(145deg,#1A2744,#0D1835)',
    border: 'rgba(255,255,255,0.08)',
    textColor: '#fff',
    priceColor: '#fff',
    subColor: 'rgba(255,255,255,0.3)',
    eyebrowColor: 'rgba(96,165,250,0.6)',
    checkBg: 'rgba(96,165,250,0.15)',
    checkColor: '#60A5FA',
    badge: null,
    features: [
      'Exclusive discounts at 50+ businesses',
      'Digital membership card with QR code',
      'Physical card mailed to your door',
      'Two names on one card (like Costco)',
      'Access to member-only events',
      'Community polls & nominations',
      'Giftable to anyone',
    ],
  },
  {
    id: 'vip',
    name: 'VIP Membership',
    tier: 'VIP',
    price: 350,
    monthly: 29,
    color: 'linear-gradient(145deg,#2D1C00,#1A0E00)',
    border: 'rgba(201,168,76,0.2)',
    textColor: '#F0D98A',
    priceColor: '#F0D98A',
    subColor: 'rgba(201,168,76,0.4)',
    eyebrowColor: 'rgba(201,168,76,0.6)',
    checkBg: 'rgba(201,168,76,0.15)',
    checkColor: '#C8962A',
    badge: '⭐ Most Popular',
    features: [
      'Everything in Regular membership',
      'VIP line status at select venues',
      'Exclusive VIP-only deals & offers',
      'Gold VIP membership card',
      'Priority access to all events',
      'Exclusive giveaway entries',
      'Limited to 200 members only',
    ],
  },
]

const FAQS = [
  { q: 'How do I use my membership?', a: 'Show your digital QR card to any participating vendor at checkout. They scan it to verify your membership and apply your discount instantly.' },
  { q: 'Can I put two names on one card?', a: 'Yes! Just like a Costco membership, you can add a second name to your card. Both people get full membership benefits.' },
  { q: 'Can I gift a membership?', a: "Absolutely! Select 'Buy as a gift' at checkout, enter the recipient's email and their shipping address. They'll receive a welcome email and their card in the mail." },
  { q: 'Will I get a physical card?', a: "Yes! After purchase, your physical membership card is printed and mailed to your address within 5–7 business days. You also get instant digital access." },
  { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime from your account dashboard. Your membership stays active until the end of your paid period.' },
  { q: 'What is the difference between Regular and VIP?', a: 'Regular gives you discounts at all partner businesses. VIP adds exclusive VIP-only deals, priority event access, gold card, and VIP line status. VIP is limited to 200 members.' },
]

export default function MembershipsPage() {
  const [isGift, setIsGift] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleCheckout = async (tier: string) => {
    setLoading(tier)
    try {
      const res = await fetch('/api/memberships/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, isGift }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error === 'AUTH_REQUIRED') {
        window.location.href = '/login?callbackUrl=/memberships'
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    }
    setLoading(null)
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '64px 24px 56px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Membership</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
            Join the Best of PB Club
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            One membership. Hundreds of dollars saved every month. Your insider pass to everything Pacific Beach.
          </p>

          {/* Gift toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '6px 8px 6px 16px' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Buying for yourself?</span>
            <button
              onClick={() => setIsGift(!isGift)}
              style={{
                background: isGift ? '#0057FF' : 'rgba(255,255,255,0.1)',
                color: '#fff', border: 'none', borderRadius: 999,
                padding: '6px 16px', fontSize: 13, fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {isGift ? '🎁 Buying as a gift' : 'Switch to gift'}
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ background: 'var(--navy2)', padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 860, margin: '0 auto' }}>
            {PLANS.map(plan => (
              <div
                key={plan.id}
                style={{
                  background: plan.color,
                  border: `1px solid ${plan.border}`,
                  borderRadius: 22, padding: 36,
                  position: 'relative',
                  transform: plan.badge ? 'translateY(-8px)' : 'none',
                  boxShadow: plan.badge ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
                }}
              >
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: '#C8962A', color: '#fff', fontSize: 12, fontWeight: 700, padding: '6px 18px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}

                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: plan.eyebrowColor, display: 'block', marginBottom: 20 }}>{plan.name}</span>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 600, color: plan.subColor, alignSelf: 'flex-start', marginTop: 8 }}>$</span>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 60, fontWeight: 800, color: plan.priceColor, lineHeight: 1, letterSpacing: '-2px' }}>{plan.price}</span>
                  <span style={{ fontSize: 16, color: plan.subColor, marginLeft: 2 }}>/year</span>
                </div>
                <p style={{ fontSize: 12, color: plan.subColor, marginBottom: 24 }}>~${plan.monthly}/month · cancel anytime</p>

                <div style={{ height: 1, background: plan.id === 'vip' ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.06)', marginBottom: 22 }} />

                {/* Features */}
                <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: plan.id === 'vip' ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                      <span style={{ width: 19, height: 19, borderRadius: '50%', background: plan.checkBg, color: plan.checkColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout(plan.tier)}
                  disabled={loading === plan.tier}
                  style={{
                    width: '100%', height: 52,
                    background: plan.id === 'vip' ? 'linear-gradient(135deg,#92400e,#C8962A)' : '#0057FF',
                    color: '#fff', border: 'none', borderRadius: 12,
                    fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                    cursor: loading === plan.tier ? 'not-allowed' : 'pointer',
                    opacity: loading === plan.tier ? 0.7 : 1,
                    transition: 'all 0.2s',
                    marginBottom: 14,
                  }}
                >
                  {loading === plan.tier ? 'Redirecting...' : isGift ? `🎁 Gift ${plan.id === 'vip' ? 'VIP' : 'Regular'} Membership` : `Get ${plan.id === 'vip' ? 'VIP' : 'Regular'} Membership`}
                </button>

                <p style={{ textAlign: 'center', fontSize: 12, color: plan.subColor }}>
                  {isGift ? 'Recipient gets their card in the mail' : 'Physical card mailed to your door'}
                </p>
              </div>
            ))}
          </div>

          {/* Trust row */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 32, marginTop: 48 }}>
            {[['🔒','Stripe-secured payments'],['📬','Physical card mailed to you'],['🎁','Easy gifting'],['❌','Cancel anytime']].map(([icon,text]) => (
              <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 10 }}>How it works</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>Up and running in minutes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              { step:'01', icon:'💳', title:'Choose your plan', desc:'Pick Regular or VIP. Both include digital and physical cards.' },
              { step:'02', icon:'📦', title:'Card gets mailed', desc:'Your physical membership card ships within 5–7 business days.' },
              { step:'03', icon:'📱', title:'Get instant access', desc:'Use your digital card immediately at any partner business.' },
              { step:'04', icon:'🏷️', title:'Start saving', desc:'Show your card or quote your member code to unlock deals.' },
            ].map(item => (
              <div key={item.step} style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--gray-50)', borderRadius: 18, border: '1px solid var(--gray-200)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12 }}>{item.step}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: 'var(--gray-50)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 10 }}>FAQ</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, overflow: 'hidden' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--gray-900)' }}>{faq.q}</span>
                  <span style={{ fontSize: 20, color: 'var(--gray-400)', flexShrink: 0, marginLeft: 12, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 18px' }}>
                    <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
