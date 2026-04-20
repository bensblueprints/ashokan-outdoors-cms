import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { v4 as uuid } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, preferred_date, group_size, message, website } = body

    // Honeypot check
    if (website) {
      return NextResponse.json({ id: 'ok' }, { status: 200 })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const id = uuid()
    const stmt = db.prepare(
      `INSERT INTO leads (id, name, email, phone, service, preferred_date, group_size, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    stmt.run(id, name, email, phone || null, service || null, preferred_date || null, group_size || null, message || null)

    return NextResponse.json({ id }, { status: 201 })
  } catch (err) {
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const status = req.nextUrl.searchParams.get('status')
  let rows
  if (status) {
    rows = db.prepare('SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC').all(status)
  } else {
    rows = db.prepare("SELECT * FROM leads WHERE status != 'deleted' ORDER BY created_at DESC").all()
  }

  return NextResponse.json(rows)
}
