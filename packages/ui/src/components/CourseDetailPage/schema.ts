import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const applicationSchema = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t('apply-form.name.required')),
    email: yup
      .string()
      .email(t('apply-form.email.invalid'))
      .max(255)
      .required(t('apply-form.email.required')),
    country: yup.string().defined(),
    city: yup.string().defined(),
    phone: yup.string().defined(),
    message: yup.string().defined(),
  })
