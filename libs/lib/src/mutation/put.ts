import { StrapiModel, StrapiMutationInput, StrapiUrl } from '@wsvvrijheid/types'

import { mutation } from './mutation'

export const putMutation = <
  T extends StrapiModel,
  D extends StrapiMutationInput,
>(
  url: StrapiUrl,
  id: number,
  body: D,
  token?: string,
) =>
  mutation<T, D>({
    url,
    method: 'put',
    id,
    body,
    token,
    queryParameters: 'populate=*',
  })
