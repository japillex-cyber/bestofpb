'use client'
import { useEffect } from 'react'
import { normalizeInstagramUrl } from '@/lib/instagram'

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

function loadScript() {
  if (typeof window === 'undefined') return
  if (window.instgrm) { window.instgrm.Embeds.process(); return }
  if (document.getElementById('ig-embed-js')) return
  const s = document.createElement('script')
  s.id = 'ig-embed-js'
  s.async = true
  s.src = 'https://www.instagram.com/embed.js'
  s.onload = () => window.instgrm?.Embeds.process()
  document.body.appendChild(s)
}

export default function InstagramEmbed({ url }: { url: string }) {
  const permalink = normalizeInstagramUrl(url)

  useEffect(() => { if (permalink) loadScript() }, [permalink])

  if (!permalink) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${permalink}?utm_source=ig_embed`}
        data-instgrm-version="14"
        style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, margin: 0, maxWidth: 540, minWidth: 280, width: '100%', padding: 0 }}
      >
        <a href={permalink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 20, textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--blue)' }}>
          View this post on Instagram →
        </a>
      </blockquote>
    </div>
  )
}
