export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, contentName, description, instagramHandle } = await req.json()

    if (!name || !contentName || !description) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    await db.submission.create({
      data: {
        name,
        contentName,
        description,
        instagramHandle: instagramHandle ?? null,
        instagramUrl: instagramHandle ? `https://instagram.com/${instagramHandle.replace('@', '')}` : null,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Submission error:', err)
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 })
  }
}
