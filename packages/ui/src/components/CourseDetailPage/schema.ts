import * as yup from 'yup'

export const applicationSchema = () =>
  yup.object({
    name: yup.string().required(),
    email: yup.string().email().max(255).required(),
    country: yup.string().defined(),
    city: yup.string().defined(),
    phone: yup.string().defined(),
    message: yup.string().defined(),
  })
