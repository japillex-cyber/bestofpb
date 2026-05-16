'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const POLLS = [
  {
    id: '1',
    question: 'Best breakfast spot in Pacific Beach?',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=70',
    category: 'Food',
    endsIn: '2 days',
    totalVotes: 847,
    options: [
      { id: 'a', label: 'Shore House Kitchen', votes: 312, color: '#0057FF' },
      { id: 'b', label: 'Kono Pizza', votes: 201, color: '#8B5CF6' },
      { id: 'c', label: 'Eggies', votes: 198, color: '#0B7A4B' },
      { id: 'd', label: 'The Broken Yolk', votes: 136, color: '#C8962A' },
    ],
  },
  {
    id: '2',
    question: 'Best beach in the PB area?',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70',
    category: 'Outdoors',
    endsIn: '5 days',
    totalVotes: 1243,
    options: [
      { id: 'a', label: 'Crystal Pier Beach', votes: 498, color: '#0057FF' },
      { id: 'b', label: 'Mission Beach', votes: 387, color: '#8B5CF6' },
      { id: 'c', label: 'Tourmaline Beach', votes: 245, color: '#0B7A4B' },
      { id: 'd', label: 'Law Street Beach', votes: 113, color: '#C8962A' },
    ],
  },
  {
    id: '3',
    question: 'Best happy hour in PB?',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600&q=70',
    category: 'Nightlife',
    endsIn: '1 day',
    totalVotes: 562,
    options: [
      { id: 'a', label: 'Craft & Pint', votes: 198, color: '#0057FF' },
      { id: 'b', label: 'Wave Lounge', votes: 187, color: '#8B5CF6' },
      { id: 'c', label: 'The Backyard', votes: 112, color: '#0B7A4B' },
      { id: 'd', label: 'Firefly', votes: 65, color: '#C8962A' },
    ],
  },
  {
    id: '4',
    question: 'Best workout spot in PB?',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=70',
    category: 'Fitness',
    endsIn: '4 days',
    totalVotes: 423,
    options: [
      { id: 'a', label: 'Pacific Fit Studio', votes: 187, color: '#0057FF' },
      { id: 'b', label: 'Beach itself', votes: 143, color: '#8B5CF6' },
      { id: 'c', label: 'PB Yoga Studio', votes: 63, color: '#0B7A4B' },
      { id: 'd', label: 'OB Noodle House', votes: 30, color: '#C8962A' },
    ],
  },
]

type VoteMap = Record<string, string>

export default function PollsPage() {
  const [votes, setVotes] = useState<VoteMap>({})
  const [polls, setPolls] = useState(POLLS)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(POLLS.map(p => p.category)))]

  const filtered = polls.filter(p => activeCategory === 'All' || p.category === activeCategory)

  const vote = (pollId: string, optionId: string) => {
    if (votes[pollId]) return // already voted
    setVotes(v => ({ ...v, [pollId]: optionId }))
    setPolls(ps => ps.map(p => {
      if (p.id !== pollId) return p
      return {
        ...p,
        totalVotes: p.totalVotes + 1,
        options: p.options.map(o =>
          o.id === optionId ? { ...o, votes: o.votes + 1 } : o
        ),
      }
    }))
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: '52px 24px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 10 }}>Community</span>
              <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 8 }}>PB Community Polls</h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}>Vote for your favorites in Pacific Beach. Results update in real time. One vote per poll.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 16px' }}>
              <span style={{ fontSize: 20 }}>🗳️</span>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{polls.reduce((s, p) => s + p.totalVotes, 0).toLocaleString()}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>total votes cast</div>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 6, marginTop: 24, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '7px 16px', borderRadius: 999, border: 'none', background: activeCategory === cat ? '#0057FF' : 'rgba(255,255,255,0.08)', color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Polls */}
      <div style={{ background: 'var(--gray-50)', padding: '36px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 22 }}>
            {filtered.map(poll => {
              const voted = votes[poll.id]
              const maxVotes = Math.max(...poll.options.map(o => o.votes))
              const winner = poll.options.find(o => o.votes === maxVotes)

              return (
                <div key={poll.id} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <img src={poll.image} alt={poll.question} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(4,9,28,0.7) 100%)' }} />
                    <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
                      <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{poll.category}</span>
                    </div>
                    <div style={{ position: 'absolute', top: 14, right: 14 }}>
                      <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>⏱ {poll.endsIn} left</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{poll.question}</h3>
                    </div>
                  </div>

                  {/* Options */}
                  <div style={{ padding: '20px 20px 22px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                      {poll.options.map(option => {
                        const pct = Math.round((option.votes / poll.totalVotes) * 100)
                        const isVoted = voted === option.id
                        const isWinner = voted && option.votes === maxVotes

                        return (
                          <button
                            key={option.id}
                            onClick={() => vote(poll.id, option.id)}
                            disabled={!!voted}
                            style={{
                              position: 'relative', width: '100%', padding: '12px 16px',
                              borderRadius: 12, border: `1.5px solid ${isVoted ? option.color : voted ? 'var(--gray-200)' : 'var(--gray-200)'}`,
                              background: isVoted ? `${option.color}10` : '#fff',
                              cursor: voted ? 'default' : 'pointer',
                              textAlign: 'left', fontFamily: 'inherit',
                              overflow: 'hidden', transition: 'all 0.2s',
                            }}
                          >
                            {/* Progress bar behind */}
                            {voted && (
                              <div style={{
                                position: 'absolute', left: 0, top: 0, bottom: 0,
                                width: `${pct}%`, background: isVoted ? `${option.color}20` : 'var(--gray-50)',
                                transition: 'width 0.6s ease', borderRadius: 10,
                              }} />
                            )}

                            {/* Label row */}
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {isVoted && <span style={{ fontSize: 14 }}>✓</span>}
                                {isWinner && !isVoted && voted && <span style={{ fontSize: 14 }}>🏆</span>}
                                <span style={{ fontSize: 14, fontWeight: isVoted || isWinner ? 700 : 500, color: isVoted ? option.color : voted ? 'var(--gray-600)' : 'var(--gray-800)' }}>
                                  {option.label}
                                </span>
                              </div>
                              {voted && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: isVoted ? option.color : 'var(--gray-500)' }}>{pct}%</span>
                                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>({option.votes.toLocaleString()})</span>
                                </div>
                              )}
                              {!voted && (
                                <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--gray-300)', flexShrink: 0 }} />
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{poll.totalVotes.toLocaleString()} votes</span>
                      {voted && winner && (
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>
                          🏆 {winner.label} is winning
                        </span>
                      )}
                      {!voted && (
                        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Tap to vote</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Instagram CTA */}
          <div style={{ background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', borderRadius: 20, padding: 36, textAlign: 'center', marginTop: 40, color: '#fff' }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>📸</div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>More polls on Instagram!</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 22, lineHeight: 1.6 }}>
              Follow <strong>@thebestofpb</strong> for daily polls, stories, and community votes that don't make it to the website.
            </p>
            <a href="https://instagram.com/thebestofpb" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#833ab4', fontSize: 14, fontWeight: 700, padding: '12px 24px', borderRadius: 12, textDecoration: 'none' }}>
              📸 Follow @thebestofpb
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
