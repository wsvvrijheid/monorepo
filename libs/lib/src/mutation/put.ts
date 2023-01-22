import { StrapiModel, StrapiUpdateInput, StrapiUrl } from '@wsvvrijheid/types'

import { mutation } from './mutation'

export const putMutation = <T extends StrapiModel, D extends StrapiUpdateInput>(
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
    queryParameters: 'populate[0]=localizations',
  })
