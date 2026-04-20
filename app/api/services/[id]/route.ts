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
    const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(Number(id))
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const body = await req.json()
    const { title, description, image, icon, href, sort_order } = body

    db.prepare(
      `UPDATE services SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        icon = COALESCE(?, icon),
        href = COALESCE(?, href),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
      WHERE id = ?`
    ).run(
      title ?? null,
      description ?? null,
      image ?? null,
      icon ?? null,
      href ?? null,
      sort_order ?? null,
      Number(id)
    )

    const updated = db.prepare('SELECT * FROM services WHERE id = ?').get(Number(id))
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Service PUT error:', err)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
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
    const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(Number(id))
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    db.prepare('DELETE FROM services WHERE id = ?').run(Number(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Service DELETE error:', err)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
