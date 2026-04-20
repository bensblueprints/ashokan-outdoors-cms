import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const password = req.headers.get('x-admin-password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { status, notes } = body

  const updates: string[] = []
  const values: unknown[] = []

  if (status) {
    updates.push('status = ?')
    values.push(status)
  }
  if (notes !== undefined) {
    updates.push('notes = ?')
    values.push(notes)
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }

  values.push(params.id)
  db.prepare(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`).run(...values)

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const password = req.headers.get('x-admin-password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  db.prepare("UPDATE leads SET status = 'deleted' WHERE id = ?").run(params.id)
  return NextResponse.json({ ok: true })
}
