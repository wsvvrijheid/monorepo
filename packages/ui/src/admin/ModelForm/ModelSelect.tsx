import { useRouter } from 'next/router'

import { ROLES, endpointsWithApprovalStatus } from '@wsvvrijheid/config'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { StrapiModel } from '@wsvvrijheid/types'

import { ModelSelectProps } from './types'
import { mapModelsToOptions } from './utils'
import { WSelect } from '../../components'

export const ModelSelect = <T extends StrapiModel>({
  endpoint,
  ...rest
}: ModelSelectProps) => {
  const { locale } = useRouter()

  const modelsQuery = useStrapiRequest<T>({
    endpoint,
    locale,
    ...(endpointsWithApprovalStatus.includes(endpoint) && {
      filters: {
        approvalStatus: { $eq: 'approved' },
      },
    }),
    populate: [],
    queryOptions: {
      enabled: endpoint !== 'roles',
    },
  })

  const models = modelsQuery.data?.data?.map((model: any) => ({
    name_en: model.title_en || model.name_en,
    name_tr: model.title_tr || model.name_tr,
    name_nl: model.title_nl || model.name_nl,
    ...model,
  }))

  const options =
    endpoint === 'roles'
      ? ROLES.map(role => ({ value: role.id.toString(), label: role.name }))
      : models && mapModelsToOptions(models, locale)

  return <WSelect options={options} {...rest} />
}
