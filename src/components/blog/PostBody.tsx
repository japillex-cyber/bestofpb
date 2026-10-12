import InstagramEmbed from '@/components/InstagramEmbed'
import { normalizeInstagramUrl } from '@/lib/instagram'

// Renders blog text written in a simple format:
//   - a blank line starts a new paragraph
//   - "## " or "### " at the start of a line makes a heading
//   - lines starting with "- " make a bullet list
//   - an Instagram post/reel link on its own line shows the post
//   - an image link on its own line shows the image
//   - [link text](https://…) makes a link

const IMAGE_RE = /^https?:\/\/\S+\.(?:jpe?g|png|webp|gif|avif)(?:\?\S*)?$|^https?:\/\/images\.unsplash\.com\/\S+$/i

function inline(text: string, keyBase: string) {
  const parts: React.ReactNode[] = []
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<a key={`${keyBase}-${i++}`} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600 }}>{m[1]}</a>)
    else parts.push(<strong key={`${keyBase}-${i++}`}>{m[3]}</strong>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export default function PostBody({ content }: { content: string }) {
  // Headings, Instagram links and image links always stand on their own,
  // even when someone forgets the blank line around them.
  const normalized = content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => {
      const t = line.trim()
      return /^#{2,3} /.test(t) || normalizeInstagramUrl(t) || IMAGE_RE.test(t) ? `\n${t}\n` : line
    })
    .join('\n')
  const blocks = normalized.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {blocks.map((block, i) => <PostBlock key={i} block={block} k={`b${i}`} />)}
    </div>
  )
}

function PostBlock({ block, k }: { block: string; k: string }) {
  const lines = block.split('\n').map(l => l.trim())
  const single = lines.length === 1 ? lines[0] : null

  if (single && normalizeInstagramUrl(single)) return <InstagramEmbed url={single} />
  if (single && IMAGE_RE.test(single)) return <img src={single} alt="" loading="lazy" style={{ width: '100%', borderRadius: 14, display: 'block' }} />
  if (single?.startsWith('### ')) return <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--gray-900)', marginTop: 8 }}>{inline(single.slice(4), k)}</h3>
  if (single?.startsWith('## ')) return <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 25, fontWeight: 800, color: 'var(--gray-900)', marginTop: 12 }}>{inline(single.slice(3), k)}</h2>
  if (lines.every(l => l.startsWith('- '))) {
    return (
      <ul style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 17, color: 'var(--gray-700)', lineHeight: 1.7 }}>
        {lines.map((l, i) => <li key={i}>{inline(l.slice(2), `${k}-${i}`)}</li>)}
      </ul>
    )
  }
  return (
    <p style={{ fontSize: 17, color: 'var(--gray-700)', lineHeight: 1.8 }}>
      {lines.map((l, i) => <span key={i}>{i > 0 && <br />}{inline(l, `${k}-${i}`)}</span>)}
    </p>
  )
}
