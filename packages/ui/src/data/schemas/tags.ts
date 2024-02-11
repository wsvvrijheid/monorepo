import * as yup from 'yup'

import { Tag } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const useTagsSchema = () => {
  return yup.object({
    slug: yup.string().required(),
    name_en: yup.date().required(),
    name_nl: yup.date().required(),
    name_tr: yup.date().required(),
  })
}

export const tagFields: FormFields<Tag> = [{ name: 'slug', isRequired: true }]
