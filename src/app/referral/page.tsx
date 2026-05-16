'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const HOW_IT_WORKS = [
  { step: '01', icon: '🔗', title: 'Get your unique link', desc: 'Every member gets a personal referral link and code tied to their account.' },
  { step: '02', icon: '📤', title: 'Share with friends', desc: 'Send your link via text, Instagram DM, or copy it anywhere you want.' },
  { step: '03', icon: '💳', title: 'Friend joins BOPB', desc: 'When your friend signs up and gets a membership using your link, it counts.' },
  { step: '04', icon: '🎁', title: 'Both of you win', desc: 'You get $20 credit toward your next renewal. They get $20 off their first membership.' },
]

const REWARDS = [
  { referrals: 1, reward: '$20 credit', icon: '🌟', desc: 'First friend joins', color: '#0057FF', bg: '#EBF0FF' },
  { referrals: 3, reward: '1 month free', icon: '🔥', desc: '3 friends joined', color: '#0B7A4B', bg: '#E8F5EE' },
  { referrals: 5, reward: 'Free upgrade to VIP', icon: '⭐', desc: '5 friends joined', color: '#C8962A', bg: '#FFF4DC' },
  { referrals: 10, reward: '1 year free', icon: '👑', desc: '10 friends joined', color: '#8B5CF6', bg: '#F3F0FF' },
]

export default function ReferralPage() {
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const user = session?.user as any
  const userName = user?.name?.split(' ')[0]?.toLowerCase() ?? 'friend'
  const referralCode = `BOPB-${userName.toUpperCase().slice(0, 4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  const referralLink = `https://bestofpb.vercel.app/register?ref=${referralCode}`

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const shareText = `Hey! I've been using Best of PB and it's amazing — exclusive deals at 50+ Pacific Beach businesses, events, packages and more. Use my link to get $20 off your membership! 🌊 ${referralLink}`

  // Mock referral data
  const referrals = [
    { name: 'Chris M.', date: '2025-06-10', status: 'Active Member', reward: '$20 credited' },
    { name: 'Dana K.', date: '2025-06-14', status: 'Signed up', reward: 'Pending membership' },
  ]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,87,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,150,42,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', padding: '64px 24px 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,150,42,0.15)', border: '1px solid rgba(200,150,42,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>🎁</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#C8962A', letterSpacing: '0.5px' }}>Referral Program</span>
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
            Share PB Love.<br />
            <span style={{ color: '#C8962A' }}>Both of you win.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            Invite your friends to Best of PB. Every friend who joins gets <strong style={{ color: '#fff' }}>$20 off</strong> their membership — and so do you.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ background: 'var(--gray-50)', padding: '56px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'flex-start' }}>

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Your referral card */}
              <div style={{ background: 'linear-gradient(135deg, #0d1835, #0b2d60)', borderRadius: 22, padding: 32, border: '1px solid rgba(255,255,255,0.08)' }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Your Referral Link</h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 24, lineHeight: 1.6 }}>Share this link with anyone. When they join Best of PB with your link, you both get rewarded!</p>

                {/* Link box */}
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{referralLink}</span>
                  <button onClick={copyLink} style={{ background: copied ? '#0B7A4B' : '#0057FF', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, transition: 'background 0.2s' }}>
                    {copied ? '✓ Copied!' : 'Copy Link'}
                  </button>
                </div>

                {/* Code box */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>CODE:</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color: '#C8962A', letterSpacing: '2px' }}>{referralCode}</span>
                  </div>
                  <button onClick={copyCode} style={{ background: copiedCode ? '#0B7A4B' : 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, transition: 'background 0.2s' }}>
                    {copiedCode ? '✓' : 'Copy'}
                  </button>
                </div>

                {/* Share buttons */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a
                    href={`https://www.instagram.com/direct/new/`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'linear-gradient(135deg,#833ab4,#fd1d1d)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}
                  >📸 Share on Instagram</a>
                  <a
                    href={`sms:?body=${encodeURIComponent(shareText)}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#0B7A4B', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                  >💬 Send via Text</a>
                  <a
                    href={`mailto:?subject=Join Best of PB!&body=${encodeURIComponent(shareText)}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                  >✉️ Send Email</a>
                </div>
              </div>

              {/* How it works */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 28 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>How it works</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {HOW_IT_WORKS.map((step, i) => (
                    <div key={step.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{step.icon}</div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>{step.step}</div>
                        <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{step.title}</div>
                        <div style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your referrals */}
              {session && (
                <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700 }}>Your Referrals</h2>
                    <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--blue)' }}>{referrals.length}</span>
                  </div>
                  {referrals.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {referrals.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--gray-50)', borderRadius: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{r.name[0]}</div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)' }}>{r.name}</div>
                              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Joined {r.date}</div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: r.reward.includes('credited') ? '#0B7A4B' : 'var(--gray-500)' }}>{r.reward}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{r.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--gray-400)', fontSize: 14 }}>
                      No referrals yet. Share your link to get started! 🚀
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column — rewards ladder */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 'calc(var(--nav-height) + 20px)' }}>

              {/* Stats */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 24 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Your Referral Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  {[
                    { label: 'Friends Referred', value: '2', icon: '👥' },
                    { label: 'Credits Earned', value: '$20', icon: '💰' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--gray-900)' }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Progress to next reward */}
                <div style={{ background: 'var(--gray-50)', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Next reward: 1 month free</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>2/3</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--gray-200)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: 8, background: 'var(--blue)', borderRadius: 4, width: '66%', transition: 'width 0.5s ease' }} />
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 8 }}>1 more friend needed!</p>
                </div>
              </div>

              {/* Rewards ladder */}
              <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, padding: 24 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Rewards Ladder</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {REWARDS.map((r, i) => {
                    const achieved = 2 >= r.referrals
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: achieved ? r.bg : 'var(--gray-50)', borderRadius: 14, border: `1px solid ${achieved ? r.color + '30' : 'transparent'}`, opacity: achieved ? 1 : 0.65 }}>
                        <div style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 700, color: achieved ? r.color : 'var(--gray-700)' }}>{r.reward}</div>
                          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{r.referrals} friend{r.referrals > 1 ? 's' : ''} · {r.desc}</div>
                        </div>
                        {achieved && <span style={{ fontSize: 16 }}>✅</span>}
                        {!achieved && <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)' }}>{r.referrals - 2} more</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Terms */}
              <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 14, padding: 18 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 10 }}>Terms & Conditions</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    'Friend must purchase a paid membership',
                    '$20 credit applied at your next renewal',
                    'No limit on referrals — keep earning!',
                    'Credits cannot be exchanged for cash',
                    'Both accounts must be in good standing',
                  ].map(t => (
                    <li key={t} style={{ fontSize: 12, color: 'var(--gray-500)', display: 'flex', gap: 6 }}>
                      <span style={{ color: 'var(--gray-300)', flexShrink: 0 }}>•</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
