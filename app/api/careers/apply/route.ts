import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const fullName = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const position = String(formData.get('position') ?? 'General Application').trim()

    const cv = formData.get('cv')
    const coverLetter = formData.get('coverLetter')

    if (!fullName || !email || !(cv instanceof File) || !(coverLetter instanceof File)) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (cv.type !== 'application/pdf' || coverLetter.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed.' }, { status: 400 })
    }

    if (cv.size > MAX_FILE_SIZE_BYTES || coverLetter.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'Each file must be 10MB or less.' }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT ?? 587)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const mailFrom = process.env.MAIL_FROM ?? smtpUser

    if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set SMTP environment variables.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const cvBuffer = Buffer.from(await cv.arrayBuffer())
    const coverLetterBuffer = Buffer.from(await coverLetter.arrayBuffer())

    await transporter.sendMail({
      from: mailFrom,
      to: 'rh@binova-holding.ca',
      replyTo: email,
      subject: `New Application - ${position}`,
      text: [
        'A new application has been submitted.',
        `Position: ${position}`,
        `Full name: ${fullName}`,
        `Email: ${email}`,
      ].join('\n'),
      html: `
        <p>A new application has been submitted.</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Full name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer,
          contentType: 'application/pdf',
        },
        {
          filename: coverLetter.name,
          content: coverLetterBuffer,
          contentType: 'application/pdf',
        },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Application email error:', error)
    return NextResponse.json({ error: 'Failed to send application.' }, { status: 500 })
  }
}
