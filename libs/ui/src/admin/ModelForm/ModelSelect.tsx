import { FC } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { WSelect } from '../../components'
import { ModelSelectProps } from './types'
import { mapModelToOption } from './utils'

export const ModelSelect: FC<ModelSelectProps> = ({ url, ...rest }) => {
  const { locale } = useRouter()
  const models = useSearchModel({
    url,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
  })

  return (
    <WSelect
      options={
        models.data?.data?.map(model =>
          mapModelToOption(model, locale as StrapiLocale),
        ) || []
      }
      {...rest}
    />
  )
}
