import { useSearchModel } from '@wsvvrijheid/services'
import { StrapiLocale, StrapiModel } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { WSelect } from '../../components'
import { ModelSelectProps } from './types'
import { mapModelsToOptions } from './utils'

export const ModelSelect = <T extends StrapiModel>({
  url,
  fields,
  ...rest
}: ModelSelectProps<T>) => {
  const { locale } = useRouter()

  const models = useSearchModel<T>({
    url,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    fields,
    populate: [],
  })

  return (
    <WSelect
      options={mapModelsToOptions(models.data?.data, locale as StrapiLocale)}
      {...rest}
    />
  )
}
