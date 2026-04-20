import { NextRequest, NextResponse } from 'next/server'
import { db, getServices } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET() {
  try {
    const services = getServices()
    return NextResponse.json(services)
  } catch (err) {
    console.error('Services GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, description, image, icon, href } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM services').get() as { max: number | null }
    const sortOrder = (maxOrder?.max ?? 0) + 1

    const result = db.prepare(
      `INSERT INTO services (title, description, image, icon, href, sort_order, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
    ).run(title, description || null, image || null, icon || null, href || null, sortOrder)

    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(result.lastInsertRowid)
    return NextResponse.json(service, { status: 201 })
  } catch (err) {
    console.error('Services POST error:', err)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
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
      const stmt = db.prepare('UPDATE services SET sort_order = ?, updated_at = datetime(\'now\') WHERE id = ?')
      for (let i = 0; i < order.length; i++) {
        stmt.run(i + 1, order[i])
      }
    })
    reorder()

    const services = getServices()
    return NextResponse.json(services)
  } catch (err) {
    console.error('Services PUT reorder error:', err)
    return NextResponse.json({ error: 'Failed to reorder services' }, { status: 500 })
  }
}
