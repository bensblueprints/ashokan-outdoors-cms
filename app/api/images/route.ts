import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const images = db.prepare('SELECT * FROM images ORDER BY uploaded_at DESC').all()
    return NextResponse.json(images)
  } catch (err) {
    console.error('Images GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}
