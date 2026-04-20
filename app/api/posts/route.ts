import { NextRequest, NextResponse } from 'next/server'
import { db, getPosts } from '@/lib/db'
import crypto from 'crypto'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category') || undefined
    const publishedParam = req.nextUrl.searchParams.get('published')
    const admin = isAdmin(req)

    // Public users only see published posts
    let published: boolean | undefined
    if (publishedParam !== null) {
      published = publishedParam === 'true'
    } else if (!admin) {
      published = true
    }

    const posts = getPosts(category, published)
    return NextResponse.json(posts)
  } catch (err) {
    console.error('Posts GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, excerpt, body: bodyText, cover_image, category, published, author } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    let slug = slugify(title)

    // Ensure slug is unique
    const existing = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug)
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    db.prepare(
      `INSERT INTO posts (id, title, slug, excerpt, body, cover_image, category, published, author, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    ).run(
      id,
      title,
      slug,
      excerpt || null,
      bodyText || null,
      cover_image || null,
      category || 'fishing',
      published ? 1 : 0,
      author || 'John Yanzek'
    )

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id)
    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    console.error('Posts POST error:', err)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
