import { StrapiModel, StrapiMutationInput, StrapiUrl } from '@wsvvrijheid/types'

import { mutation } from './mutation'

export const postMutation = <
  T extends StrapiModel,
  D extends StrapiMutationInput,
>(
  url: StrapiUrl,
  body: D,
  token?: string,
) => mutation<T, D>({ url, method: 'post', body, token })
