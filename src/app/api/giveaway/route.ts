export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json()

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // Get active giveaway
    const giveaway = await db.giveaway.findFirst({
      where: { isActive: true },
    })

    if (!giveaway) {
      return NextResponse.json({ error: 'No active giveaway found.' }, { status: 404 })
    }

    // Check if already entered
    const existing = await db.giveawayEntry.findFirst({
      where: { giveawayId: giveaway.id, email },
    })

    if (existing) {
      return NextResponse.json({ error: 'This email has already been entered in this giveaway.' }, { status: 409 })
    }

    // Create entry
    await db.giveawayEntry.create({
      data: {
        giveawayId: giveaway.id,
        name,
        email,
        phone,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Giveaway entry error:', err)
    return NextResponse.json({ error: 'Failed to enter. Please try again.' }, { status: 500 })
  }
}
