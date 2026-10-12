export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Quick check that the database matches the code. Shows table/column problems only, no data.
export async function GET() {
  const checks: Record<string, string> = {}
  const run = async (name: string, fn: () => Promise<unknown>) => {
    try { await fn(); checks[name] = 'ok' } catch (e: any) { checks[name] = String(e?.message ?? e).split('\n').filter(Boolean).slice(-3).join(' ').slice(0, 400) }
  }
  await run('vendors', () => db.vendor.findFirst())
  await run('deals', () => db.deal.findFirst())
  await run('events', () => db.event.findFirst())
  await run('categories', () => db.category.findFirst())
  await run('users', () => db.user.findFirst({ select: { id: true } }))
  await run('memberships', () => db.membership.findFirst())
  await run('posts', () => db.post.findFirst())
  return NextResponse.json(checks)
}
