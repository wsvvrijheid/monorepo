import {
  StrapiLocale,
  StrapiModel,
  StrapiMutationInput,
  StrapiMutationResponse,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { generateFormData } from '../../util'
import { fetcher } from '../fetcher'

type Method = 'post' | 'put' | 'delete' | 'localize'

type MutationParams<D> = {
  body?: D
  id?: number
  locale?: StrapiLocale
  method: Method
  token?: string
  url: StrapiUrl
}

// T is the type of the model to be returned
// D is the type of the data to be sent
export const mutation = async <
  T extends StrapiModel,
  D extends StrapiMutationInput = StrapiMutationInput,
>({
  body,
  id,
  locale,
  method,
  token,
  url,
}: MutationParams<D>) => {
  //  Throw an error if the body is not provided
  if (method !== 'delete' && !body) {
    throw new Error(`Body is required for ${method} method`)
  }

  //  Throw an error if the id is not provided
  if (method !== 'post' && !id) {
    throw new Error(`Id is required for ${method} method`)
  }

  if (method === 'localize') {
    // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
    const response = await fetcher(token).post<StrapiMutationResponse<T>>(
      `/${url}/${id}/localizations`,
      { ...body, locale }, // TODO localization body doesn't seem to have data key. Double check this
    )
    return response.data?.data || null
  }

  const requestUrl = id ? `${url}/${id}` : url
  let requestBody = {}

  if (body) {
    requestBody = generateFormData<D>(body)
  }

  const response = await fetcher(token)[method]<StrapiMutationResponse<T>>(
    requestUrl,
    requestBody,
  )

  return response.data?.data || null
}
