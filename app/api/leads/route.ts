import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { v4 as uuid } from 'uuid'
import nodemailer from 'nodemailer'

async function sendNotification(lead: {
  name: string
  email: string
  phone: string | null
  service: string | null
  group_size: string | null
  preferred_date: string | null
  message: string | null
}) {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const notifyEmail = process.env.NOTIFY_EMAIL

  if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) return

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '587'),
      secure: smtpPort === '465',
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Ashokan Outdoors Website" <${smtpUser}>`,
      to: notifyEmail,
      subject: `New Booking Request from ${lead.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a3d1a; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #d4a853; margin: 0; font-size: 22px;">New Booking Request</h1>
            <p style="color: #a8c5a8; margin: 8px 0 0;">Ashokan Outdoors Website</p>
          </div>
          <div style="background: #f8f8f8; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333; width: 140px;">Name:</td><td style="padding: 8px 0; color: #555;">${lead.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td><td style="padding: 8px 0; color: #555;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
              ${lead.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td><td style="padding: 8px 0; color: #555;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>` : ''}
              ${lead.service ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Service:</td><td style="padding: 8px 0; color: #555;">${lead.service}</td></tr>` : ''}
              ${lead.group_size ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Group Size:</td><td style="padding: 8px 0; color: #555;">${lead.group_size}</td></tr>` : ''}
              ${lead.preferred_date ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Preferred Date:</td><td style="padding: 8px 0; color: #555;">${lead.preferred_date}</td></tr>` : ''}
            </table>
            ${lead.message ? `<div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border-left: 3px solid #1a3d1a;"><p style="margin: 0 0 4px; font-weight: bold; color: #333;">Message:</p><p style="margin: 0; color: #555; line-height: 1.6;">${lead.message}</p></div>` : ''}
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              View all leads at your admin dashboard.
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Email notification error:', err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, website } = body

    // Accept both camelCase (from form) and snake_case
    const groupSize = body.groupSize || body.group_size || null
    const preferredDate = body.date || body.preferred_date || null
    const message = body.message || null

    // Honeypot check
    if (website) {
      return NextResponse.json({ id: 'ok' }, { status: 200 })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const id = uuid()
    const stmt = db.prepare(
      `INSERT INTO leads (id, name, email, phone, service, preferred_date, group_size, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    stmt.run(id, name, email, phone || null, service || null, preferredDate, groupSize, message)

    // Send email notification (fire and forget)
    sendNotification({
      name,
      email,
      phone: phone || null,
      service: service || null,
      group_size: groupSize,
      preferred_date: preferredDate,
      message,
    })

    return NextResponse.json({ id }, { status: 201 })
  } catch (err) {
    console.error('Lead submission error:', err)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const status = req.nextUrl.searchParams.get('status')
  let rows
  if (status) {
    rows = db.prepare('SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC').all(status)
  } else {
    rows = db.prepare("SELECT * FROM leads WHERE status != 'deleted' ORDER BY created_at DESC").all()
  }

  return NextResponse.json(rows)
}
