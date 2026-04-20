import { NextRequest, NextResponse } from 'next/server'
import { db, getSettings } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET() {
  try {
    const settings = getSettings()
    return NextResponse.json(settings)
  } catch (err) {
    console.error('Settings GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    const upsert = db.prepare(
      `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )

    if (body.settings && typeof body.settings === 'object') {
      const updateMany = db.transaction(() => {
        for (const [key, value] of Object.entries(body.settings)) {
          upsert.run(key, String(value))
        }
      })
      updateMany()
    } else if (body.key && body.value !== undefined) {
      upsert.run(body.key, String(body.value))
    } else {
      return NextResponse.json({ error: 'Invalid body. Provide { key, value } or { settings: { ... } }' }, { status: 400 })
    }

    const settings = getSettings()
    return NextResponse.json(settings)
  } catch (err) {
    console.error('Settings PUT error:', err)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
