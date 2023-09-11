import { ReactNode } from 'react'

import { StrapiTranslatableModel } from '@wsvvrijheid/types'

import { ModelEditFormProps } from '../ModelForm'

export type ModelEditTranslateProps<T extends StrapiTranslatableModel> = Omit<
  ModelEditFormProps<T>,
  'model' | 'onSuccess'
> & { id: number; children?: ReactNode }
