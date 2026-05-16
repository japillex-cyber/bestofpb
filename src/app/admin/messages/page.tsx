'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const MESSAGES = [
  { id:'1', name:'Alex Rivera', email:'alex@example.com', subject:'Membership question', message:'Hi! I wanted to know if I can add my partner to my membership card after purchase, or does it need to be done at the time of purchase? Thanks!', date:'2025-06-17 09:23', read:false },
  { id:'2', name:'Sarah Johnson', email:'sarah@example.com', subject:'Vendor inquiry', message:'Hello! I own a local yoga studio in Pacific Beach and would love to be a vendor partner with Best of PB. How does the vendor application process work?', date:'2025-06-17 08:15', read:false },
  { id:'3', name:'Mike Chen', email:'mike@example.com', subject:'Technical issue', message:'Hi, I am having trouble accessing my membership card on the dashboard. When I click on Membership Card tab, nothing shows up. Can you help?', date:'2025-06-16 15:42', read:true },
  { id:'4', name:'Jordan Lee', email:'jordan@example.com', subject:'Partnership', message:'We are a local surf brand and would love to explore a partnership with Best of PB. Would you be open to a collaboration? We have 10k followers on Instagram.', date:'2025-06-16 11:30', read:true },
  { id:'5', name:'Taylor Kim', email:'taylor@example.com', subject:'General question', message:'When is the next PB Night Market? I saw it on your events page but want to confirm it is still happening. Looking forward to it!', date:'2025-06-15 14:20', read:true },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(MESSAGES)
  const [selected, setSelected] = useState<typeof MESSAGES[0] | null>(null)
  const [filter, setFilter] = useState('ALL')

  const filtered = messages.filter(m => filter === 'ALL' || (filter === 'UNREAD' ? !m.read : m.read))

  const markRead = (id: string) => {
    setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const openMessage = (msg: typeof MESSAGES[0]) => {
    setSelected(msg)
    markRead(msg.id)
  }

  return (
    <AdminLayout title="Messages" subtitle={`${messages.filter(m => !m.read).length} unread messages`}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>

        {/* Message list */}
        <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: 6 }}>
            {['ALL','UNREAD','READ'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 12px', borderRadius: 999, border: 'none', background: filter === f ? 'var(--blue)' : 'var(--gray-100)', color: filter === f ? '#fff' : 'var(--gray-600)', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{f}</button>
            ))}
          </div>
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {filtered.map((msg, i) => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                style={{ padding: '14px 16px', borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none', cursor: 'pointer', background: selected?.id === msg.id ? 'var(--blue-light)' : 'transparent', transition: 'background 0.15s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {!msg.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />}
                  <span style={{ fontSize: 13.5, fontWeight: msg.read ? 500 : 700, color: 'var(--gray-900)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-400)', flexShrink: 0 }}>{msg.date.split(' ')[1]}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.subject}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Message detail */}
        {selected ? (
          <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: 28 }}>
            <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--gray-100)' }}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{selected.subject}</h3>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--gray-600)', fontWeight: 600 }}>👤 {selected.name}</span>
                <a href={`mailto:${selected.email}`} style={{ fontSize: 13, color: 'var(--blue)' }}>{selected.email}</a>
                <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>📅 {selected.date}</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.8, marginBottom: 28 }}>{selected.message}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              >✉️ Reply via Email</a>
              <button
                onClick={() => setMessages(ms => ms.filter(m => m.id !== selected.id))}
                style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >🗑 Delete</button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>✉️</div>
              <p style={{ fontSize: 15, color: 'var(--gray-400)' }}>Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
