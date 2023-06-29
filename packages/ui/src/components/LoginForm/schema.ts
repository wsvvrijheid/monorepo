import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const loginSchema = (t: TFunction) =>
  yup.object({
    password: yup.string().required(t('login.password.required') as string),
    identifier: yup
      .string()
      .email(t('contact.form.email-invalid') as string)
      .required(t('login.email.required') as string),
  })
