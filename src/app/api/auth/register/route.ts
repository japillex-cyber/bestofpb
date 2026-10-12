export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcryptjs'
import { createBusinessForUser } from '@/lib/business-signup'

// Free sign-up for community members and businesses.
// Invite codes are optional now; a valid one is still counted (useful for tracking referrals).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const password = String(body.password ?? '')
    const phone = String(body.phone ?? '').trim() || null
    const accountType = body.accountType === 'business' ? 'business' : 'member'
    const inviteCode = String(body.inviteCode ?? '').trim().toUpperCase()

    if (!name || !email || !password) return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 })
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    if (accountType === 'business' && (!String(body.businessName ?? '').trim() || !body.categoryId)) {
      return NextResponse.json({ error: 'Business name and category are required.' }, { status: 400 })
    }

    let invite = null
    if (inviteCode) {
      invite = await db.inviteCode.findUnique({ where: { code: inviteCode } })
      const usable = invite && invite.isActive && (!invite.expiresAt || invite.expiresAt > new Date()) && (!invite.maxUses || invite.usedCount < invite.maxUses)
      if (!usable) return NextResponse.json({ error: 'That invite code is not valid. You can leave it empty.' }, { status: 400 })
    }

    const existing = await db.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } })
    if (existing) return NextResponse.json({ error: 'An account with this email already exists. Try signing in.' }, { status: 409 })

    const user = await db.user.create({
      data: { name, email, phone, password: await hash(password, 12), role: 'USER' },
    })
    if (invite) await db.inviteCode.update({ where: { id: invite.id }, data: { usedCount: { increment: 1 } } })

    if (accountType === 'business') {
      try {
        await createBusinessForUser(user.id, {
          businessName: String(body.businessName), categoryId: String(body.categoryId),
          instagramHandle: body.instagramHandle, website: body.website, phone: body.phone, email,
        })
      } catch (err: any) {
        // The account exists; they can finish their business profile from /business.
        console.error('Business profile create error:', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
