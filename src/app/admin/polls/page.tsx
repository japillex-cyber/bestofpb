'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const INIT_POLLS = [
  { id:'1', question:'Best breakfast spot in Pacific Beach?', category:'Food', totalVotes:847, isActive:true, endsAt:'2025-07-01', options:[{label:'Shore House Kitchen',votes:312},{label:'Kono Pizza',votes:201},{label:'Eggies',votes:198},{label:'The Broken Yolk',votes:136}] },
  { id:'2', question:'Best beach in the PB area?', category:'Outdoors', totalVotes:1243, isActive:true, endsAt:'2025-07-05', options:[{label:'Crystal Pier Beach',votes:498},{label:'Mission Beach',votes:387},{label:'Tourmaline Beach',votes:245},{label:'Law Street Beach',votes:113}] },
  { id:'3', question:'Best happy hour in PB?', category:'Nightlife', totalVotes:562, isActive:false, endsAt:'2025-06-20', options:[{label:'Craft & Pint',votes:198},{label:'Wave Lounge',votes:187},{label:'The Backyard',votes:112},{label:'Firefly',votes:65}] },
]

type Poll = typeof INIT_POLLS[0]

export default function AdminPollsPage() {
  const [polls, setPolls] = useState(INIT_POLLS)
  const [showNew, setShowNew] = useState(false)
  const [viewPoll, setViewPoll] = useState<Poll | null>(null)
  const [newForm, setNewForm] = useState({ question:'', category:'Food', endsAt:'', opt1:'', opt2:'', opt3:'', opt4:'' })

  const toggleActive = (id: string) => {
    setPolls(ps => ps.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p))
  }

  const deletePoll = (id: string) => {
    setPolls(ps => ps.filter(p => p.id !== id))
    setViewPoll(null)
  }

  const createPoll = () => {
    const opts = [newForm.opt1, newForm.opt2, newForm.opt3, newForm.opt4].filter(Boolean).map(label => ({ label, votes: 0 }))
    const poll: Poll = {
      id: String(Date.now()),
      question: newForm.question,
      category: newForm.category,
      totalVotes: 0,
      isActive: false,
      endsAt: newForm.endsAt,
      options: opts,
    }
    setPolls(ps => [...ps, poll])
    setShowNew(false)
    setNewForm({ question:'', category:'Food', endsAt:'', opt1:'', opt2:'', opt3:'', opt4:'' })
  }

  const inputStyle = { width: '100%', height: 44, padding: '0 12px', border: '1.5px solid var(--gray-200)', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--gray-50)', color: 'var(--gray-800)' }
  const labelStyle = { display: 'block' as const, fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 7 }

  return (
    <AdminLayout title="Polls" subtitle={`${polls.filter(p => p.isActive).length} active · ${polls.length} total`}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label:'Total Polls', value: polls.length, icon:'🗳️' },
          { label:'Active', value: polls.filter(p => p.isActive).length, icon:'✅' },
          { label:'Total Votes', value: polls.reduce((s,p) => s + p.totalVotes, 0).toLocaleString(), icon:'👆' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--gray-900)' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Polls list */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700 }}>All Polls</h3>
          <button onClick={() => setShowNew(true)} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ New Poll</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {polls.map((poll, i) => {
            const winner = [...poll.options].sort((a,b) => b.votes - a.votes)[0]
            return (
              <div key={poll.id} style={{ padding: '18px 20px', borderBottom: i < polls.length - 1 ? '1px solid var(--gray-100)' : 'none', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: poll.isActive ? '#4ADE80' : 'var(--gray-300)', flexShrink: 0 }} />
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>{poll.question}</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: 'var(--blue-light)', color: 'var(--blue)' }}>{poll.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>👆 {poll.totalVotes.toLocaleString()} votes</span>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>📅 Ends {poll.endsAt}</span>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>🏆 Leading: {winner.label} ({winner.votes})</span>
                  </div>
                  {/* Mini results */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {poll.options.map(opt => (
                      <div key={opt.label} style={{ fontSize: 11, padding: '3px 10px', background: 'var(--gray-100)', borderRadius: 999, color: 'var(--gray-600)' }}>
                        {opt.label}: {poll.totalVotes ? Math.round((opt.votes/poll.totalVotes)*100) : 0}%
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => setViewPoll(poll)} style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', borderRadius: 7, padding: '7px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>
                  <button onClick={() => toggleActive(poll.id)} style={{ background: poll.isActive ? '#FEE2E2' : '#E8F5EE', color: poll.isActive ? '#B91C1C' : '#0B7A4B', border: 'none', borderRadius: 7, padding: '7px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {poll.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => deletePoll(poll.id)} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 7, padding: '7px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🗑</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* View Poll Modal */}
      {viewPoll && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.7)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 480, padding: 28, position: 'relative' }}>
            <button onClick={() => setViewPoll(null)} style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 6, paddingRight: 40 }}>{viewPoll.question}</h2>
            <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 24 }}>{viewPoll.totalVotes.toLocaleString()} total votes · Ends {viewPoll.endsAt}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[...viewPoll.options].sort((a,b) => b.votes - a.votes).map((opt, i) => {
                const pct = viewPoll.totalVotes ? Math.round((opt.votes / viewPoll.totalVotes) * 100) : 0
                return (
                  <div key={opt.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 14, fontWeight: i === 0 ? 700 : 500, color: 'var(--gray-800)' }}>{i === 0 ? '🏆 ' : ''}{opt.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-600)' }}>{pct}% ({opt.votes})</span>
                    </div>
                    <div style={{ height: 8, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: 8, background: i === 0 ? 'var(--blue)' : 'var(--gray-300)', borderRadius: 4, width: `${pct}%`, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => toggleActive(viewPoll.id)} style={{ flex: 1, height: 42, background: viewPoll.isActive ? '#FEE2E2' : '#E8F5EE', color: viewPoll.isActive ? '#B91C1C' : '#0B7A4B', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {viewPoll.isActive ? 'Deactivate Poll' : 'Activate Poll'}
              </button>
              <button onClick={() => deletePoll(viewPoll.id)} style={{ height: 42, background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 16px' }}>🗑 Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* New Poll Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.7)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 480, padding: 28, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setShowNew(false)} style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Create New Poll</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={labelStyle}>Question</label><input type="text" placeholder="e.g. Best surf spot in PB?" value={newForm.question} onChange={e => setNewForm(f => ({ ...f, question: e.target.value }))} style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={labelStyle}>Category</label>
                  <select value={newForm.category} onChange={e => setNewForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['Food','Nightlife','Outdoors','Fitness','Self Care','General'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>End Date</label><input type="date" value={newForm.endsAt} onChange={e => setNewForm(f => ({ ...f, endsAt: e.target.value }))} style={inputStyle} /></div>
              </div>
              <div>
                <label style={labelStyle}>Answer Options (min 2)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['opt1','opt2','opt3','opt4'].map((key, i) => (
                    <input key={key} type="text" placeholder={`Option ${i+1}${i < 2 ? ' (required)' : ' (optional)'}`} value={(newForm as any)[key]} onChange={e => setNewForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={createPoll} disabled={!newForm.question || !newForm.opt1 || !newForm.opt2} style={{ flex: 1, height: 46, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: (!newForm.question || !newForm.opt1 || !newForm.opt2) ? 0.5 : 1 }}>Create Poll</button>
                <button onClick={() => setShowNew(false)} style={{ height: 46, background: 'var(--gray-100)', color: 'var(--gray-700)', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '0 20px' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
