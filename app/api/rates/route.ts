import { NextRequest, NextResponse } from 'next/server'
import { db, getRates } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category')
    const rates = getRates(category || undefined)

    // Group by category
    const grouped: Record<string, typeof rates> = {}
    for (const rate of rates) {
      if (!grouped[rate.category]) grouped[rate.category] = []
      grouped[rate.category].push(rate)
    }

    return NextResponse.json(category ? rates : grouped)
  } catch (err) {
    console.error('Rates GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { category, label, price, details } = body

    if (!category || !label || !price) {
      return NextResponse.json({ error: 'category, label, and price are required' }, { status: 400 })
    }

    const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM rates WHERE category = ?').get(category) as { max: number | null }
    const sortOrder = (maxOrder?.max ?? 0) + 1

    const result = db.prepare(
      `INSERT INTO rates (category, label, price, details, sort_order, updated_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`
    ).run(category, label, price, details || null, sortOrder)

    const rate = db.prepare('SELECT * FROM rates WHERE id = ?').get(result.lastInsertRowid)
    return NextResponse.json(rate, { status: 201 })
  } catch (err) {
    console.error('Rates POST error:', err)
    return NextResponse.json({ error: 'Failed to create rate' }, { status: 500 })
  }
}
