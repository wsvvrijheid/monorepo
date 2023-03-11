import { MergeExclusive } from 'type-fest'

type BaseEmail = {
  // If we don't specify the receiver,
  // the email will be sent to the admin by default
  to?: string
  cc?: string
  bcc?: string
  replyTo?: string
  subject: string
  from?: string
}

interface EmailCreateTextInpit extends BaseEmail {
  text: string
}

interface EmailCreateHtmlInput extends BaseEmail {
  html: string
}

// Allow only one of text or html
export type EmailCreateInput = MergeExclusive<
  EmailCreateTextInpit,
  EmailCreateHtmlInput
>
