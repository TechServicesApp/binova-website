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
  isPartnership: z.boolean().optional(),
  projectTitle: z.string().optional(),
  projectId: z.string().optional(),
  projectSector: z.string().optional(),
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
  isPartnership,
  projectsEmail,
  contactEmail,
}: {
  service: string
  message: string
  isPartnership?: boolean
  projectsEmail: string
  contactEmail: string
}) {
  // Partnership requests always go to projects email
  if (isPartnership) {
    return { targetEmail: projectsEmail, smtpScope: 'projects' as const }
  }

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

    const { name, email, phone, company, service, message, isPartnership, projectTitle, projectId, projectSector } = parsed.data

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
      isPartnership,
      projectsEmail,
      contactEmail,
    })

    const emailSubject = isPartnership 
      ? `Partnership Inquiry - ${projectTitle || 'Project'}`
      : `Contact Form - ${service}`

    const emailText = [
      isPartnership 
        ? 'A new partnership inquiry has been submitted.'
        : 'A new contact request has been submitted.',
      `Destination: ${targetEmail}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || '-'}`,
      `Company: ${company || '-'}`,
      `Service: ${service}`,
      ...(isPartnership && projectTitle ? [
        `Project Title: ${projectTitle}`,
        ...(projectId ? [`Project ID: ${projectId}`] : []),
        ...(projectSector ? [`Project Sector: ${projectSector}`] : []),
      ] : []),
      `Message: ${message}`,
    ].join('\n')

    const emailHtml = `
      <p>${isPartnership 
        ? 'A new partnership inquiry has been submitted.'
        : 'A new contact request has been submitted.'}</p>
      <p><strong>Destination:</strong> ${targetEmail}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || '-'}</p>
      <p><strong>Company:</strong> ${company || '-'}</p>
      <p><strong>Service:</strong> ${service}</p>
      ${isPartnership && projectTitle ? `
        <p><strong>Project Title:</strong> ${projectTitle}</p>
        ${projectId ? `<p><strong>Project ID:</strong> ${projectId}</p>` : ''}
        ${projectSector ? `<p><strong>Project Sector:</strong> ${projectSector}</p>` : ''}
      ` : ''}
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `

    await sendScopedMail({
      scope: smtpScope,
      to: targetEmail,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact email error:', error)
    return NextResponse.json({ error: getMailerErrorMessage(error) }, { status: 500 })
  }
}
