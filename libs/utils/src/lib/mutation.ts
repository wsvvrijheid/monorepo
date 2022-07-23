import { StrapiModel } from '@wsvvrijheid/types'

import { fetcher } from './fetcher'

type MutationReturnType<T extends StrapiModel> = {
  post: (url: string, data: unknown) => Promise<T>
  put: (url: string, id: number, data: unknown) => Promise<T>
  delete: (url: string, id: number) => Promise<T>
  localize: (url: string, id: number, data: unknown) => Promise<T>
}

export const mutation = <T extends StrapiModel>(
  token?: string,
): MutationReturnType<T> => ({
  post: async (url, data) => {
    const response = await fetcher(token).post<T>(`/${url}`, data)
    return response.data
  },
  put: async (url, id, data) => {
    const response = await fetcher(token).put<T>(`/${url}/${id}`, data)
    return response.data
  },
  delete: async (url, id) => {
    const response = await fetcher(token).delete<T>(`/${url}/${id}`)
    return response.data
  },
  // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
  localize: async (url, id, data) => {
    const response = await fetcher(token).post<T>(
      `/${url}/${id}/localizations`,
      data,
    )
    return response.data
  },
})
