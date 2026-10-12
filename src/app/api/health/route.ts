export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'

// Compares the database with the code and lists any missing tables, columns or enum values.
// Shows structure only, never data.
export async function GET() {
  try {
    const cols: { table_name: string; column_name: string }[] = await db.$queryRaw`SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public'`
    const enums: { typname: string; enumlabel: string }[] = await db.$queryRaw`SELECT t.typname, e.enumlabel FROM pg_type t JOIN pg_enum e ON e.enumtypid = t.oid`
    const have = new Map<string, Set<string>>()
    for (const c of cols) { if (!have.has(c.table_name)) have.set(c.table_name, new Set()); have.get(c.table_name)!.add(c.column_name) }
    const missing: Record<string, string[]> = {}
    for (const m of Prisma.dmmf.datamodel.models) {
      const table = m.dbName ?? m.name
      const existing = have.get(table)
      const needed = m.fields.filter(f => f.kind !== 'object').map(f => f.dbName ?? f.name)
      const gone = existing ? needed.filter(c => !existing.has(c)) : ['(whole table missing)']
      if (gone.length) missing[table] = gone
    }
    const enumMissing: Record<string, string[]> = {}
    for (const e of Prisma.dmmf.datamodel.enums) {
      const labels = enums.filter(x => x.typname === (e.dbName ?? e.name)).map(x => x.enumlabel)
      const gone = labels.length ? e.values.map(v => v.name).filter(v => !labels.includes(v)) : ['(whole type missing)']
      if (gone.length) enumMissing[e.name] = gone
    }
    return NextResponse.json({ missingColumns: missing, missingEnumValues: enumMissing })
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e).slice(0, 500) }, { status: 500 })
  }
}
