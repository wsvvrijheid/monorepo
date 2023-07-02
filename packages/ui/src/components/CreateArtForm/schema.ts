import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const createArtSchema = (t: TFunction) =>
  yup.object({
    title: yup.string().required(t('art.create.form.title-required')),
    description: yup
      .string()
      .required(t('art.create.form.description-required')),
    categories: yup.array().of(
      yup.object({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
  })
