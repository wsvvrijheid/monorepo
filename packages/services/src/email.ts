import { EMAIL_SENDER, EMAIL_RECEIVER } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { EmailCreateInput } from '@wsvvrijheid/types'

export const sendEmail = async (data: EmailCreateInput, token: string) => {
  const body: EmailCreateInput = {
    ...data,
    to: data.to || EMAIL_RECEIVER || EMAIL_SENDER,
    from: EMAIL_SENDER as string,
  }

  Mutation.post('api/email', body, token)
}
