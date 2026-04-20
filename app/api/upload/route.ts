import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    const uploadDir = path.join(process.env.DATA_DIR || '/app/data', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const ext = path.extname(file.name) || '.jpg'
    const id = crypto.randomUUID()
    const filename = `${id}${ext}`
    const filepath = path.join(uploadDir, filename)

    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(filepath, buffer)

    db.prepare(
      `INSERT INTO images (id, filename, original_name, alt, size, uploaded_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`
    ).run(id, filename, file.name, '', file.size)

    return NextResponse.json({
      url: `/api/uploads/${filename}`,
      filename,
      id,
    }, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
