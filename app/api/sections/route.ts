import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const sections = db.prepare('SELECT * FROM sections ORDER BY slug ASC').all()
    return NextResponse.json(sections)
  } catch (err) {
    console.error('Sections GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
  }
}
