// Turns any instagram.com post or reel link into the clean permalink Instagram expects.
// Returns null for anything that is not a single post/reel link.
export function normalizeInstagramUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim())
    if (!/(^|\.)instagram\.com$/.test(u.hostname)) return null
    const m = u.pathname.match(/^\/(?:[A-Za-z0-9_.]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/)
    if (!m) return null
    const kind = m[1] === 'reels' ? 'reel' : m[1]
    return `https://www.instagram.com/${kind}/${m[2]}/`
  } catch {
    return null
  }
}
