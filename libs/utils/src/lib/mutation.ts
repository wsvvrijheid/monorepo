import {
  StrapiLocale,
  StrapiModel,
  StrapiMutationResponse,
} from '@wsvvrijheid/types'

import { fetcher } from './fetcher'

type MutationReturnType<T> = {
  post: (url: string, data: Record<string, unknown>) => Promise<T>
  put: (url: string, id: number, data: Record<string, unknown>) => Promise<T>
  delete: (url: string, id: number) => Promise<T>
  localize: (
    url: string,
    id: number,
    locale: StrapiLocale,
    data: Record<string, unknown>,
  ) => Promise<T>
}

export const mutation = <T extends StrapiModel>(
  token?: string,
): MutationReturnType<T> => ({
  post: async (url, data) => {
    const response = await fetcher(token).post<StrapiMutationResponse<T>>(
      `/${url}`,
      data,
    )
    return response.data?.data || null
  },
  put: async (url, id, data) => {
    const response = await fetcher(token).put<StrapiMutationResponse<T>>(
      `/${url}/${id}`,
      data,
    )
    return response.data?.data || null
  },
  delete: async (url, id) => {
    const response = await fetcher(token).delete<StrapiMutationResponse<T>>(
      `/${url}/${id}`,
    )
    return response.data?.data || null
  },
  // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
  localize: async (url, id, locale, data) => {
    const response = await fetcher(token).post<StrapiMutationResponse<T>>(
      `/${url}/${id}/localizations`,
      { ...data, locale },
    )
    return response.data?.data || null
  },
})
