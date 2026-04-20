import { NextRequest, NextResponse } from 'next/server'
import { db, getPost } from '@/lib/db'

function isAdmin(req: Request): boolean {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = getPost(slug)

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Only admins can see unpublished posts
    if (!post.published && !isAdmin(req)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (err) {
    console.error('Post GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
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
    const post = getPost(slug)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const body = await req.json()
    const { title, excerpt, body: bodyText, cover_image, category, published, author } = body

    db.prepare(
      `UPDATE posts SET
        title = COALESCE(?, title),
        excerpt = COALESCE(?, excerpt),
        body = COALESCE(?, body),
        cover_image = COALESCE(?, cover_image),
        category = COALESCE(?, category),
        published = COALESCE(?, published),
        author = COALESCE(?, author),
        updated_at = datetime('now')
      WHERE slug = ?`
    ).run(
      title ?? null,
      excerpt ?? null,
      bodyText ?? null,
      cover_image ?? null,
      category ?? null,
      published !== undefined ? (published ? 1 : 0) : null,
      author ?? null,
      slug
    )

    const updated = getPost(slug)
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Post PUT error:', err)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    db.prepare('DELETE FROM posts WHERE slug = ?').run(slug)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Post DELETE error:', err)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
