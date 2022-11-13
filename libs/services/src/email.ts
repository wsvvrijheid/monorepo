import { EMAIL_SENDER, EMAIL_RECEIVER } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { MergeExclusive } from 'type-fest'

type BaseEmailData = {
  // If we don't specify the receiver,
  // the email will be sent to the admin by default
  to?: string
  cc?: string
  bcc?: string
  replyTo?: string
  subject: string
}

interface EmailDataText extends BaseEmailData {
  text: string
}

interface EmailDataHtml extends BaseEmailData {
  html: string
}

// Allow only one of text or html
export type EmailData = MergeExclusive<EmailDataText, EmailDataHtml>

export const sendEmail = async (data: EmailData) => {
  const body = {
    ...data,
    to: data.to || EMAIL_RECEIVER || EMAIL_SENDER,
    from: EMAIL_SENDER,
  }

  Mutation.post('api/email', body)
}
