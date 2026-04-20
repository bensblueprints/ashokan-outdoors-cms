import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import fs from 'fs'
import path from 'path'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
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
    const image = db.prepare('SELECT * FROM images WHERE id = ?').get(id) as {
      id: string
      filename: string
    } | undefined

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Delete file from disk
    const uploadDir = path.join(process.env.DATA_DIR || '/app/data', 'uploads')
    const filepath = path.join(uploadDir, image.filename)
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    // Delete from database
    db.prepare('DELETE FROM images WHERE id = ?').run(id)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Image DELETE error:', err)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
