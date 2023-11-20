import * as yup from 'yup'

import { Foundation } from '@wsvvrijheid/types'

import { FormFields } from '../../admin'

export const useFoundationsSchema = () => {
  return yup.object({
    name: yup.string().required(),
    bank1: yup.string().required(),
    iban1: yup.string().required(),
    bank2: yup.string().required(),
    iban2: yup.string().required(),
    email: yup.string().email().required(),
    // TODO
   // contact: yup.string().required(),
  })
}

export const foundationFields: FormFields<Foundation> = [
  { name: 'name', isRequired: true },
  { name: 'bank1', isRequired: true },
  { name: 'IBAN1', isRequired: true },
  { name: 'bank2', isRequired: true },
  { name: 'IBAN2', isRequired: true },
  { name: 'email', isRequired: true },
 // { name: 'contact', isRequired: true },
]
