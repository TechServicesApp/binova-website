import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getMailerErrorMessage, sendScopedMail } from '@/lib/mailer'

export const runtime = 'nodejs'

const newsletterSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid newsletter payload.' }, { status: 400 })
    }

    const { email, source } = parsed.data

    const newsletterEmail = process.env.NEWSLETTER_EMAIL

    if (!newsletterEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set newsletter recipient environment variables.' },
        { status: 500 }
      )
    }

    await sendScopedMail({
      scope: 'newsletter',
      to: newsletterEmail,
      replyTo: email,
      subject: 'Newsletter Subscription',
      text: [
        'A new newsletter subscription has been submitted.',
        `Subscriber: ${email}`,
        `Source: ${source ?? 'unknown'}`,
      ].join('\n'),
      html: `
        <p>A new newsletter subscription has been submitted.</p>
        <p><strong>Subscriber:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source ?? 'unknown'}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Newsletter email error:', error)
    return NextResponse.json({ error: getMailerErrorMessage(error) }, { status: 500 })
  }
}
