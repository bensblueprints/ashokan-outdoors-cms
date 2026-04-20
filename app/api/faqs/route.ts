import { NextRequest, NextResponse } from 'next/server'
import { db, getFaqs } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET() {
  try {
    const faqs = getFaqs()
    return NextResponse.json(faqs)
  } catch (err) {
    console.error('FAQs GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { question, answer } = body

    if (!question || !answer) {
      return NextResponse.json({ error: 'question and answer are required' }, { status: 400 })
    }

    const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM faqs').get() as { max: number | null }
    const sortOrder = (maxOrder?.max ?? 0) + 1

    const result = db.prepare(
      `INSERT INTO faqs (question, answer, sort_order, updated_at)
       VALUES (?, ?, ?, datetime('now'))`
    ).run(question, answer, sortOrder)

    const faq = db.prepare('SELECT * FROM faqs WHERE id = ?').get(result.lastInsertRowid)
    return NextResponse.json(faq, { status: 201 })
  } catch (err) {
    console.error('FAQs POST error:', err)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { order } = body

    if (!Array.isArray(order)) {
      return NextResponse.json({ error: 'order must be an array of IDs' }, { status: 400 })
    }

    const reorder = db.transaction(() => {
      const stmt = db.prepare('UPDATE faqs SET sort_order = ?, updated_at = datetime(\'now\') WHERE id = ?')
      for (let i = 0; i < order.length; i++) {
        stmt.run(i + 1, order[i])
      }
    })
    reorder()

    const faqs = getFaqs()
    return NextResponse.json(faqs)
  } catch (err) {
    console.error('FAQs PUT reorder error:', err)
    return NextResponse.json({ error: 'Failed to reorder FAQs' }, { status: 500 })
  }
}
