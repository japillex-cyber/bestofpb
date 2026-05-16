import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { compare } from 'bcryptjs'

export async function GET() {
  try {
    const user = await db.user.findUnique({
      where: { email: 'admin@bestofpb.com' }
    })
    
    if (!user) return NextResponse.json({ error: 'User not found' })
    
    const valid = await compare('password', user.password ?? '')
    
    return NextResponse.json({ 
      found: true,
      hasPassword: !!user.password,
      passwordValid: valid,
      role: user.role,
      passwordPreview: user.password?.substring(0, 10)
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
}