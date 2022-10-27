import { StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

import { mutation } from './mutation'

export const deleteMutation = <T extends StrapiModel>(
  url: StrapiUrl,
  id: number,
  token?: string,
) => mutation<T>({ url, method: 'delete', id, token })
