import { EMAIL_SENDER, EMAIL_RECEIVER } from '@fc/config'
import { Mutation } from '@fc/lib'
import { EmailCreateInput } from '@fc/types'

export const sendEmail = async (data: EmailCreateInput, token: string) => {
  const body: EmailCreateInput = {
    ...data,
    to: data.to || EMAIL_RECEIVER || EMAIL_SENDER,
    from: EMAIL_SENDER as string,
  }

  Mutation.post('email', body, token)
}
