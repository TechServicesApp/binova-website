import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getMailerErrorMessage, sendScopedMail } from '@/lib/mailer'

export const runtime = 'nodejs'

const contactPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10),
})

const PROJECT_SERVICES = new Set([
  'feasibility',
  'design',
  'supply',
  'management',
  'investment',
])

const PROJECT_KEYWORDS = [
  'project',
  'projet',
  'feasibility',
  'faisabilite',
  'execution',
  'infrastructure',
  'investment',
  'engineering',
]

function resolveTargetEmail({
  service,
  message,
  projectsEmail,
  contactEmail,
}: {
  service: string
  message: string
  projectsEmail: string
  contactEmail: string
}) {
  if (PROJECT_SERVICES.has(service)) {
    return { targetEmail: projectsEmail, smtpScope: 'projects' as const }
  }

  if (service === 'other') {
    const normalizedMessage = message.toLowerCase()
    const looksProjectRelated = PROJECT_KEYWORDS.some((keyword) => normalizedMessage.includes(keyword))
    return looksProjectRelated
      ? { targetEmail: projectsEmail, smtpScope: 'projects' as const }
      : { targetEmail: contactEmail, smtpScope: 'contact' as const }
  }

  return { targetEmail: contactEmail, smtpScope: 'contact' as const }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactPayloadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid contact form data.' }, { status: 400 })
    }

    const { name, email, phone, company, service, message } = parsed.data

    const projectsEmail = process.env.PROJECTS_EMAIL
    const contactEmail = process.env.CONTACT_EMAIL

    if (!projectsEmail || !contactEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set SMTP and recipient environment variables.' },
        { status: 500 }
      )
    }

    const { targetEmail, smtpScope } = resolveTargetEmail({
      service,
      message,
      projectsEmail,
      contactEmail,
    })

    await sendScopedMail({
      scope: smtpScope,
      to: targetEmail,
      replyTo: email,
      subject: `Contact Form - ${service}`,
      text: [
        'A new contact request has been submitted.',
        `Destination: ${targetEmail}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        `Company: ${company || '-'}`,
        `Service: ${service}`,
        `Message: ${message}`,
      ].join('\n'),
      html: `
        <p>A new contact request has been submitted.</p>
        <p><strong>Destination:</strong> ${targetEmail}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Company:</strong> ${company || '-'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact email error:', error)
    return NextResponse.json({ error: getMailerErrorMessage(error) }, { status: 500 })
  }
}
