import Link from 'next/link'
import type { BusinessCardData } from '@/lib/vendors'
import { hasLocalsLoveBadge } from '@/lib/plans'

const FALLBACK_BG = 'linear-gradient(145deg,#0b2d60,#1557c0)'

export function LocalsLoveBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#FFF1F2', color: '#BE123C', border: '1px solid #FECDD3', fontSize: size === 'md' ? 12 : 11, fontWeight: 700, padding: size === 'md' ? '5px 12px' : '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      ❤️ Locals Love
    </span>
  )
}

export default function BusinessCard({ v, isMember, index = 0 }: { v: BusinessCardData; isMember: boolean; index?: number }) {
  const locked = !!v.deal && v.deal.memberOnly && !isMember
  return (
    <Link
      href={`/shop-local/${v.slug}`}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 18, overflow: 'hidden', background: '#fff', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)', animation: `fadeUp 0.5s ease ${Math.min(index, 8) * 60}ms both` }}
    >
      <div style={{ height: 160, background: v.photo ? `#0b2d60 url("${v.photo}") center/cover` : FALLBACK_BG, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '12px 14px' }}>
        <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>
          {v.category.icon} {v.category.name}
        </span>
        {v.plan === 'PREMIUM' && (
          <span style={{ background: 'rgba(200,150,42,0.95)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 999, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Local Partner</span>
        )}
      </div>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>{v.name}</h3>
          {hasLocalsLoveBadge(v.plan) && <LocalsLoveBadge />}
        </div>
        {v.blurb && (
          <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.blurb}</p>
        )}
        {v.deal && (
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: locked ? 'var(--gray-50)' : 'var(--blue-light)', border: locked ? '1px dashed var(--gray-200)' : '1px solid transparent', borderRadius: 10, padding: '10px 12px' }}>
            <span style={{ fontSize: 14 }}>{locked ? '🔒' : '🏷️'}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: locked ? 'var(--gray-500)' : 'var(--blue)' }}>
              {locked ? 'Member deal · join to unlock' : v.deal.title}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
