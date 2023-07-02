import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const contactSchema = (t: TFunction) =>
  yup.object({
    fullname: yup.string().required(t('contact.form.fullname-required')),
    email: yup
      .string()
      .email(t('contact.form.email-invalid'))
      .required(t('contact.form.email-required')),
    message: yup.string().required(t('contact.form.message-required')),
  })
