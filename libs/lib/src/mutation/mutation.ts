import { API_URL } from '@wsvvrijheid/config'
import {
  StrapiCreateInput,
  StrapiLocale,
  StrapiModel,
  StrapiMutationResponse,
  StrapiUpdateInput,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { generateFormData } from '@wsvvrijheid/utils'
import axios from 'axios'

type Method = 'post' | 'put' | 'delete' | 'localize'

type MutationParams<D> = {
  body?: D
  id?: number
  locale?: StrapiLocale
  method: Method
  token: string
  url: StrapiUrl
  queryParameters?: string
}

// T is the type of the model to be returned
// D is the type of the data to be sent
export const mutation = async <
  T extends StrapiModel,
  D extends StrapiCreateInput | StrapiUpdateInput,
>({
  body,
  id,
  locale,
  method,
  token,
  url,
  queryParameters,
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
    const response = await axios.post<T>(
      `${url}/${id}/localizations`,
      { ...body, locale }, // TODO localization body doesn't seem to have data key. Double check this
      { baseURL: API_URL, headers: { Authorization: `Bearer ${token}` } },
    )

    return response.data || null
  }

  const queryParams = queryParameters ? `?${queryParameters}` : ''

  const requestUrl = id ? `${url}/${id}${queryParams}` : `${url}${queryParams}`

  if (method === 'delete') {
    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      {
        headers: { Authorization: `Bearer ${token}` },
        baseURL: API_URL,
      },
    )
    return response.data?.data || null
  }

  let requestBody = { data: body } as unknown as FormData

  if (
    typeof window !== 'undefined' &&
    body &&
    Object.values(body).some(
      value => value instanceof File || value instanceof Blob,
    )
  ) {
    requestBody = generateFormData<D>(body)
  }

  try {
    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      requestBody,
      {
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data?.data || null
  } catch (error) {
    console.log('Mutation error', error)
    return null
  }
}
