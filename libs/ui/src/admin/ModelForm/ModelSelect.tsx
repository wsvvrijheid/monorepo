import { useRouter } from 'next/router'

import { useSearchModel } from '@wsvvrijheid/services'
import { StrapiLocale, StrapiModel } from '@wsvvrijheid/types'

import { ModelSelectProps } from './types'
import { mapModelsToOptions } from './utils'
import { WSelect } from '../../components'

export const ModelSelect = <T extends StrapiModel>({
  url,
  ...rest
}: ModelSelectProps) => {
  const { locale } = useRouter()

  const modelsQuery = useSearchModel<T>({
    url,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    populate: [],
  })

  const models = modelsQuery.data?.data

  return (
    <WSelect
      options={models && mapModelsToOptions(models, locale as StrapiLocale)}
      {...rest}
    />
  )
}
