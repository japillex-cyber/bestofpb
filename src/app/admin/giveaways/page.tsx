'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const ENTRIES = [
  { id:'1', name:'Alex Rivera', email:'alex@example.com', phone:'(619) 555-0101', date:'2025-06-15 09:23' },
  { id:'2', name:'Sarah Johnson', email:'sarah@example.com', phone:'(619) 555-0202', date:'2025-06-15 10:45' },
  { id:'3', name:'Mike Chen', email:'mike@example.com', phone:'(619) 555-0303', date:'2025-06-15 11:12' },
  { id:'4', name:'Jordan Lee', email:'jordan@example.com', phone:'(619) 555-0404', date:'2025-06-16 08:30' },
  { id:'5', name:'Taylor Kim', email:'taylor@example.com', phone:'(619) 555-0505', date:'2025-06-16 09:15' },
  { id:'6', name:'Chris Park', email:'chris@example.com', phone:'(619) 555-0606', date:'2025-06-16 14:22' },
  { id:'7', name:'Morgan Smith', email:'morgan@example.com', phone:'(619) 555-0707', date:'2025-06-17 10:05' },
  { id:'8', name:'Casey Brown', email:'casey@example.com', phone:'(619) 555-0808', date:'2025-06-17 16:45' },
]

export default function AdminGiveawaysPage() {
  const [isActive, setIsActive] = useState(true)
  const [winner, setWinner] = useState<typeof ENTRIES[0] | null>(null)
  const [search, setSearch] = useState('')

  const filtered = ENTRIES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  )

  const pickWinner = () => {
    const rand = ENTRIES[Math.floor(Math.random() * ENTRIES.length)]
    setWinner(rand)
  }

  return (
    <AdminLayout title="Giveaway Management" subtitle="Win a Free Year of VIP Membership — $350 value">

      {/* Giveaway status card */}
      <div style={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isActive ? '#4ADE80' : '#EF4444', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? '#4ADE80' : '#FCA5A5', letterSpacing: '0.5px' }}>{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
          </div>
          <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Win a Free Year of VIP Membership!</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Draw date: July 31, 2025 · {ENTRIES.length} entries so far</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setIsActive(!isActive)} style={{ background: isActive ? '#FEE2E2' : '#E8F5EE', color: isActive ? '#B91C1C' : '#0B7A4B', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {isActive ? '⏸ Deactivate' : '▶ Activate'}
          </button>
          <button onClick={pickWinner} style={{ background: '#C8962A', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            🎲 Pick Winner
          </button>
        </div>
      </div>

      {/* Winner display */}
      {winner && (
        <div style={{ background: 'linear-gradient(135deg,#0a3a00,#0d5a00)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 16, padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 48 }}>🎉</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#4ADE80', letterSpacing: '1px', marginBottom: 4 }}>WINNER SELECTED</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff' }}>{winner.name}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{winner.email} · {winner.phone}</div>
          </div>
          <button onClick={() => setWinner(null)} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label:'Total Entries', value: ENTRIES.length, icon:'📝' },
          { label:'Today\'s Entries', value: ENTRIES.filter(e => e.date.startsWith('2025-06-17')).length, icon:'📅' },
          { label:'Days Remaining', value: 14, icon:'⏳' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--gray-900)' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Entries table */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', height: 42 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search entries..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit' }} />
        </div>
        <button style={{ background: '#fff', border: '1.5px solid var(--gray-200)', color: 'var(--gray-700)', fontSize: 13, fontWeight: 600, padding: '0 16px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', height: 42 }}>📥 Export CSV</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
              {['#', 'Name', 'Email', 'Phone', 'Date Entered'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr key={entry.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none', background: winner?.id === entry.id ? '#E8F5EE' : 'transparent' }}>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--gray-400)', fontWeight: 600 }}>#{i + 1}</td>
                <td style={{ padding: '12px 16px', fontSize: 13.5, fontWeight: 600, color: 'var(--gray-900)' }}>{entry.name}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--gray-500)' }}>{entry.email}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--gray-500)' }}>{entry.phone}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-400)' }}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
