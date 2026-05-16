import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { businessName, instagramHandle, reason, category, submittedByName, submittedByEmail } = await req.json()

    if (!businessName || !reason || !submittedByName || !submittedByEmail) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    await db.nomination.create({
      data: {
        businessName,
        instagramHandle: instagramHandle ? `@${instagramHandle.replace('@', '')}` : null,
        reason,
        category: category || null,
        submittedByName,
        submittedByEmail,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Nomination error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
