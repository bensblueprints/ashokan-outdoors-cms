import { NextRequest, NextResponse } from 'next/server'
import { db, getSection } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const section = getSection(slug)
    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }
    return NextResponse.json(section)
  } catch (err) {
    console.error('Section GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch section' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await params
    const section = getSection(slug)
    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    const body = await req.json()
    const { title, subtitle, body: bodyText, image } = body

    db.prepare(
      `UPDATE sections SET
        title = COALESCE(?, title),
        subtitle = COALESCE(?, subtitle),
        body = COALESCE(?, body),
        image = COALESCE(?, image),
        updated_at = datetime('now')
      WHERE slug = ?`
    ).run(
      title ?? null,
      subtitle ?? null,
      bodyText ?? null,
      image ?? null,
      slug
    )

    const updated = getSection(slug)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Section PUT error:', err)
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 })
  }
}
