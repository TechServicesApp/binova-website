import nodemailer from 'nodemailer'

export type MailScope = 'projects' | 'contact' | 'hr' | 'newsletter'

interface SmtpConfig {
  smtpHost: string
  smtpPort: number
  smtpTlsServername: string
  smtpUser: string
  smtpPass: string
  mailFrom: string
}

interface SendScopedMailInput {
  scope: MailScope
  to: string
  replyTo?: string
  subject: string
  text: string
  html: string
  attachments?: nodemailer.SendMailOptions['attachments']
}

function readScopedEnv(scope: MailScope, key: 'SMTP_USER' | 'SMTP_PASS') {
  const envKey = `${scope.toUpperCase()}_${key}`
  return process.env[envKey]
}

function readScopedMailFrom(scope: MailScope) {
  const envKey = `${scope.toUpperCase()}_MAIL_FROM`
  return process.env[envKey]
}

function createConfigError(message: string) {
  const error = new Error(message) as Error & { code: string }
  error.code = 'ECONFIG'
  return error
}

export function getSmtpConfig(scope?: MailScope): SmtpConfig | null {
  const smtpHost = process.env.SMTP_HOST_IPV4 ?? process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT ?? 587)
  const smtpTlsServername = process.env.SMTP_TLS_SERVERNAME ?? process.env.SMTP_HOST
  const smtpUser = scope ? readScopedEnv(scope, 'SMTP_USER') ?? process.env.SMTP_USER : process.env.SMTP_USER
  const smtpPass = scope ? readScopedEnv(scope, 'SMTP_PASS') ?? process.env.SMTP_PASS : process.env.SMTP_PASS
  const mailFrom = scope
    ? readScopedMailFrom(scope) ?? smtpUser ?? process.env.MAIL_FROM
    : process.env.MAIL_FROM ?? smtpUser

  if (!smtpHost || !smtpTlsServername || !smtpUser || !smtpPass || !mailFrom) {
    return null
  }

  return {
    smtpHost,
    smtpPort,
    smtpTlsServername,
    smtpUser,
    smtpPass,
    mailFrom,
  }
}

export function createMailTransporter(config: {
  smtpHost: string
  smtpPort: number
  smtpTlsServername: string
  smtpUser: string
  smtpPass: string
}) {
  const encryption = (process.env.SMTP_ENCRYPTION ?? '').toLowerCase()
  const useSsl = encryption === 'ssl' || config.smtpPort === 465

  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: useSsl,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    tls: {
      servername: config.smtpTlsServername,
    },
  })
}

export async function sendScopedMail(input: SendScopedMailInput) {
  const smtpConfig = getSmtpConfig(input.scope)

  if (!smtpConfig) {
    throw createConfigError(`SMTP is not configured for ${input.scope} emails.`)
  }

  const transporter = createMailTransporter(smtpConfig)

  await transporter.sendMail({
    from: smtpConfig.mailFrom,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
    attachments: input.attachments,
  })
}

export function getMailerErrorMessage(error: unknown) {
  const maybeError = error as {
    code?: string
    message?: string
    response?: string
  }

  const code = maybeError?.code

  if (code === 'EAUTH') {
    return 'SMTP authentication failed. Check SMTP user/password for this channel.'
  }

  if (code === 'ESOCKET' || code === 'ETIMEDOUT') {
    return 'SMTP connection failed. Check SMTP host/port/TLS and network access. If IPv6 is unreachable, set SMTP_HOST_IPV4 and SMTP_TLS_SERVERNAME.'
  }

  if (code === 'EENVELOPE') {
    return 'SMTP rejected sender/recipient envelope. Check MAIL_FROM and destination email addresses.'
  }

  if (code === 'ECONFIG') {
    return maybeError?.message ?? 'SMTP configuration is missing for this mail channel.'
  }

  if (maybeError?.response) {
    return `SMTP error: ${maybeError.response}`
  }

  return maybeError?.message ?? 'Unknown mailer error.'
}
