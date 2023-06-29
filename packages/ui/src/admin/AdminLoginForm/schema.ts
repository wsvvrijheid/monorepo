import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const adminLoginSchema = (t: TFunction) =>
  yup.object({
    password: yup.string().required(t('login.password.required') as string),
    identifier: yup
      .string()
      .required(t('login.email-or-username.required') as string),
  })
