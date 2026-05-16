export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { code, maxUses, note, expiresAt } = await req.json()

    if (!code) return NextResponse.json({ error: 'Code is required.' }, { status: 400 })

    const invite = await db.inviteCode.create({
      data: {
        code: code.trim().toUpperCase(),
        maxUses: maxUses ? parseInt(maxUses) : null,
        note: note || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true,
      },
    })

    return NextResponse.json({ success: true, invite })
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'This invite code already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create invite code.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const codes = await db.inviteCode.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ codes })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch codes.' }, { status: 500 })
  }
}
