'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'

type Post = { id?: string; title: string; slug: string; excerpt: string; coverImage: string; content: string; tags: string; published: boolean }
const EMPTY: Post = { title: '', slug: '', excerpt: '', coverImage: '', content: '', tags: '', published: false }

const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-600)', marginBottom: 5 }
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none' }
const btn: React.CSSProperties = { background: 'none', border: 'none', color: 'var(--blue)', fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '4px 8px', fontFamily: 'inherit' }

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Post | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/posts', { cache: 'no-store' })
    if (res.ok) setPosts((await res.json()).posts)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const open = (p?: any) => {
    setError('')
    setEditing(p ? { id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt ?? '', coverImage: p.coverImage ?? '', content: p.content, tags: (p.tags ?? []).join(', '), published: p.published } : { ...EMPTY })
  }

  const save = async (publish?: boolean) => {
    if (!editing) return
    setSaving(true); setError('')
    const body = { ...editing, published: publish ?? editing.published }
    const res = await fetch(editing.id ? `/api/admin/posts/${editing.id}` : '/api/admin/posts', {
      method: editing.id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (!res.ok) return setError(data.error ?? 'Save failed.')
    setEditing(null)
    load()
  }

  const remove = async (p: any) => {
    if (!confirm(`Delete "${p.title}"? This can't be undone.`)) return
    await fetch(`/api/admin/posts/${p.id}`, { method: 'DELETE' })
    load()
  }

  const set = (k: keyof Post, v: any) => setEditing(e => e && { ...e, [k]: v })

  return (
    <AdminLayout title="Blog" subtitle="Write posts and embed Instagram posts so the site and Instagram work together">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={() => open()} className="btn btn-primary btn-md">+ New post</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>Loading…</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No posts yet. Write your first one.</div>
        ) : posts.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderTop: '1px solid var(--gray-100)' }}>
            <div style={{ width: 64, height: 44, borderRadius: 8, flexShrink: 0, background: p.coverImage ? `url("${p.coverImage}") center/cover` : 'var(--gray-100)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{p.title}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>/blog/{p.slug}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: p.published ? '#E8F5EE' : '#FEF3C7', color: p.published ? '#0B7A4B' : '#92400E' }}>{p.published ? 'Published' : 'Draft'}</span>
            <button onClick={() => open(p)} style={btn}>Edit</button>
            <Link href={`/blog/${p.slug}`} target="_blank" style={{ ...btn, textDecoration: 'none' }}>View</Link>
            <button onClick={() => remove(p)} style={{ ...btn, color: '#B91C1C' }}>Delete</button>
          </div>
        ))}
      </div>

      {editing && (
        <div onClick={() => setEditing(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.55)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 'min(780px, 100%)', height: '100%', background: '#fff', overflowY: 'auto', padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800 }}>{editing.id ? 'Edit post' : 'New post'}</h2>
              <button onClick={() => setEditing(null)} style={{ ...btn, fontSize: 18 }} aria-label="Close">✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label style={label}>Title *</label><input value={editing.title} onChange={e => set('title', e.target.value)} style={{ ...input, fontSize: 17, fontWeight: 700 }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                <div><label style={label}>Page address</label><input value={editing.slug} onChange={e => set('slug', e.target.value)} placeholder="auto from title" style={input} /></div>
                <div><label style={label}>Tags (comma separated)</label><input value={editing.tags} onChange={e => set('tags', e.target.value)} placeholder="food, events, spotlight" style={input} /></div>
              </div>
              <div><label style={label}>Cover image link</label><input value={editing.coverImage} onChange={e => set('coverImage', e.target.value)} placeholder="https://…" style={input} /></div>
              <div><label style={label}>Short summary (shows on the blog page and in Google)</label><input value={editing.excerpt} onChange={e => set('excerpt', e.target.value)} style={input} /></div>
              <div>
                <label style={label}>Post</label>
                <textarea value={editing.content} onChange={e => set('content', e.target.value)} rows={18} style={{ ...input, resize: 'vertical', lineHeight: 1.6 }} placeholder={'Write your post here.\n\nPaste an Instagram post link on its own line to show the post:\nhttps://www.instagram.com/p/ABC123/\n\n## A heading\n- a bullet point\n[link text](https://example.com)'} />
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 6, lineHeight: 1.6 }}>
                  Tips: leave a blank line between paragraphs. <strong>Paste an Instagram post or reel link on its own line</strong> to show it in the post. Image links on their own line show as pictures. Start a line with <code>## </code> for a heading or <code>- </code> for a bullet.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <button disabled={saving} onClick={() => save(true)} className="btn btn-primary btn-md">{saving ? 'Saving…' : editing.published ? 'Save & keep published' : 'Publish'}</button>
              <button disabled={saving} onClick={() => save(false)} className="btn btn-ghost btn-md">{editing.published ? 'Unpublish (save as draft)' : 'Save draft'}</button>
              {error && <span style={{ fontSize: 13, color: '#B91C1C', fontWeight: 600 }}>{error}</span>}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
