import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const existing = db.prepare('SELECT * FROM faqs WHERE id = ?').get(Number(id))
    if (!existing) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    const body = await req.json()
    const { question, answer, sort_order } = body

    db.prepare(
      `UPDATE faqs SET
        question = COALESCE(?, question),
        answer = COALESCE(?, answer),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
      WHERE id = ?`
    ).run(
      question ?? null,
      answer ?? null,
      sort_order ?? null,
      Number(id)
    )

    const updated = db.prepare('SELECT * FROM faqs WHERE id = ?').get(Number(id))
    return NextResponse.json(updated)
  } catch (err) {
    console.error('FAQ PUT error:', err)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const existing = db.prepare('SELECT * FROM faqs WHERE id = ?').get(Number(id))
    if (!existing) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    db.prepare('DELETE FROM faqs WHERE id = ?').run(Number(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('FAQ DELETE error:', err)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
