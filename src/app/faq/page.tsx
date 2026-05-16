'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const FAQS = [
  {
    id: '1',
    question: 'How do I use my membership discount?',
    answer: 'Show your digital membership card QR code to any participating vendor at checkout. They scan it to verify your active membership and apply your discount instantly. You can also quote your unique member ID number.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Membership',
  },
  {
    id: '2',
    question: 'Can I put two names on one membership card?',
    answer: 'Yes! Just like a Costco membership, you can add a second name to your card. Simply go to your dashboard after purchase and add the second name under Membership Card settings. Both people get full access to all member benefits.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Membership',
  },
  {
    id: '3',
    question: 'Can I gift a membership to someone?',
    answer: 'Absolutely! On the memberships page, select "Buy as a gift" and enter the recipient\'s name, email, and shipping address for their physical card. They will receive a welcome email with instructions to activate their digital card immediately.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Membership',
  },
  {
    id: '4',
    question: 'Will I get a physical membership card?',
    answer: 'Yes! After purchase, your physical membership card is printed and mailed to your address within 5-7 business days. You also get instant access to your digital card with QR code on your dashboard right after purchase.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Membership',
  },
  {
    id: '5',
    question: 'What is the difference between Regular and VIP?',
    answer: 'Regular gives you exclusive discounts at all 50+ partner businesses and a digital + physical card. VIP adds VIP line status at select venues, exclusive VIP-only deals, a gold membership card, priority event access, and is limited to only 200 members.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Membership',
  },
  {
    id: '6',
    question: 'Can I cancel my membership anytime?',
    answer: 'Yes, cancel anytime from your account dashboard under My Membership. Your membership stays active until the end of your current paid annual period. No hidden fees or cancellation charges.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Membership',
  },
  {
    id: '7',
    question: 'How do I become a vendor on Best of PB?',
    answer: 'Vendors are invited by the BOPB team — we are invite-only to maintain quality for our members. If you are a local Pacific Beach business interested in joining, reach out through our Contact page and our team will be in touch.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Vendors',
  },
  {
    id: '8',
    question: 'How do I submit an event to the calendar?',
    answer: 'Go to our Events page and click "Submit an Event". Fill in your event details including name, date, location, and description. Our team reviews all submissions within 24 hours and publishes approved events to the calendar.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Events',
  },
  {
    id: '9',
    question: 'How do nominations work?',
    answer: 'Anyone can nominate a local business, artist, or creator on our Nominations page. The community votes on submissions and every month we feature the top 3 nominations on our platform and Instagram page.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Community',
  },
  {
    id: '10',
    question: 'How do I enter the giveaway?',
    answer: 'Visit our Giveaway page and fill in your first name, email, and phone number. One entry per person. Follow @thebestofpb on Instagram for a bonus entry. Winners are announced on our Instagram page on the draw date.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Community',
  },
  {
    id: '11',
    question: 'How are PB packages different from memberships?',
    answer: 'Memberships give you ongoing discounts at partner businesses all year long. Packages are one-time curated experiences like bachelorette parties, birthday experiences, and bar crawls that you book for a specific occasion. Membership discounts do NOT apply to packages.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'Packages',
  },
  {
    id: '12',
    question: 'Is Best of PB on Instagram?',
    answer: 'Yes! Follow us at @thebestofpb for daily PB content, featured businesses, event announcements, giveaways, and community spotlights. Our FAQ answers are also featured as Instagram posts — click "See on Instagram" next to any answer.',
    instagramUrl: 'https://instagram.com/thebestofpb',
    category: 'General',
  },
]

const CATEGORIES = ['All', 'Membership', 'Vendors', 'Events', 'Community', 'Packages', 'General']

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = FAQS.filter(f => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory
    const matchSearch = f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '64px 24px 52px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Help Center</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,5vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Everything you need to know about Best of PB. Each answer links to our Instagram post for more details.
          </p>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '0 18px', height: 50, maxWidth: 480, margin: '0 auto' }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 15, fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Category pills */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content', justifyContent: 'center' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ padding: '8px 16px', borderRadius: 999, border: 'none', background: activeCategory === cat ? '#0057FF' : 'rgba(255,255,255,0.06)', color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ list */}
      <div style={{ background: 'var(--gray-50)', padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 24, textAlign: 'center' }}>
            {filtered.length} questions found
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(faq => (
              <div
                key={faq.id}
                style={{ background: '#fff', border: `1px solid ${openId === faq.id ? 'var(--blue)' : 'var(--gray-200)'}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.2s', boxShadow: openId === faq.id ? '0 4px 20px rgba(0,87,255,0.08)' : 'none' }}
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', gap: 16 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: openId === faq.id ? 'var(--blue)' : 'var(--gray-100)', color: openId === faq.id ? '#fff' : 'var(--gray-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0, marginTop: 1, transition: 'all 0.2s' }}>?</span>
                    <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--gray-900)', lineHeight: 1.4 }}>{faq.question}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: 'var(--gray-100)', color: 'var(--gray-500)', letterSpacing: '0.3px' }}>{faq.category}</span>
                    <span style={{ fontSize: 20, color: 'var(--gray-300)', transition: 'transform 0.2s', transform: openId === faq.id ? 'rotate(45deg)' : 'none', display: 'block', lineHeight: 1 }}>+</span>
                  </div>
                </button>

                {openId === faq.id && (
                  <div style={{ padding: '0 24px 22px', paddingLeft: 66 }}>
                    <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 16 }}>{faq.answer}</p>
                    <a
                      href={faq.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#E1306C', textDecoration: 'none', background: '#FFF0F5', padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(225,48,108,0.15)' }}
                    >
                      📸 See on Instagram @thebestofpb
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🤔</div>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No results found</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 20 }}>Try a different search term or browse all categories.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="btn btn-primary btn-md">Clear search</button>
            </div>
          )}

          {/* Still need help */}
          <div style={{ background: 'var(--navy)', borderRadius: 20, padding: 36, textAlign: 'center', marginTop: 40 }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>💬</div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Still have questions?</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 22, lineHeight: 1.7 }}>
              Can not find what you are looking for? Our team is happy to help.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-primary btn-md">Contact Us</a>
              <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-md">DM us on Instagram</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
