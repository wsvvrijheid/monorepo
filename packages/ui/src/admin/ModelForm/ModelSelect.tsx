import { useRouter } from 'next/router'

import { useSearchModel } from '@wsvvrijheid/services'
import { StrapiModel } from '@wsvvrijheid/types'

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
    locale,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    populate: [],
  })

  const models = modelsQuery.data?.data?.map((model: any) => ({
    name_en: model.title_en || model.name_en,
    name_tr: model.title_tr || model.name_tr,
    name_nl: model.title_nl || model.name_nl,
    ...model,
  }))

  return (
    <WSelect options={models && mapModelsToOptions(models, locale)} {...rest} />
  )
}
