import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, inviteCode } = await req.json()

    if (!name || !email || !password || !inviteCode) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    // Validate invite code
    const invite = await db.inviteCode.findUnique({ where: { code: inviteCode.trim().toUpperCase() } })
    if (!invite || !invite.isActive) {
      return NextResponse.json({ error: 'Invalid invite code.' }, { status: 400 })
    }
    if (invite.maxUses && invite.usedCount >= invite.maxUses) {
      return NextResponse.json({ error: 'Invite code has reached its limit.' }, { status: 400 })
    }

    // Check email uniqueness
    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    // Create user and consume invite code
    const hashedPassword = await hash(password, 12)

    await db.$transaction(async (tx) => {
      await tx.user.create({
        data: { name, email, password: hashedPassword, role: 'USER' },
      })
      await tx.inviteCode.update({
        where: { id: invite.id },
        data: { usedCount: { increment: 1 } },
      })
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
