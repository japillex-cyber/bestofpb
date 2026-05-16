import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    if (!code) return NextResponse.json({ error: 'Invite code is required.' }, { status: 400 })

    const invite = await db.inviteCode.findUnique({ where: { code: code.trim().toUpperCase() } })

    if (!invite || !invite.isActive) return NextResponse.json({ error: 'Invalid invite code.' }, { status: 400 })
    if (invite.expiresAt && invite.expiresAt < new Date()) return NextResponse.json({ error: 'This invite code has expired.' }, { status: 400 })
    if (invite.maxUses && invite.usedCount >= invite.maxUses) return NextResponse.json({ error: 'This invite code has reached its limit.' }, { status: 400 })

    return NextResponse.json({ valid: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
