import { fetcher } from './fetcher'

type MutationReturnType = {
  post: (url: string, data: unknown) => Promise<unknown>
  put: (url: string, id: number, data: unknown) => Promise<unknown>
  delete: (url: string, id: number) => Promise<unknown>
  localize: (url: string, id: number, data: unknown) => Promise<unknown>
}

export const mutation = (token?: string): MutationReturnType => ({
  post: async (url, data) => {
    const response = await fetcher(token).post(`/${url}`, data)
    return response.data
  },
  put: async (url, id, data) => {
    const response = await fetcher(token).put(`/${url}/${id}`, data)
    return response.data
  },
  delete: async (url, id) => {
    const response = await fetcher(token).delete(`/${url}/${id}`)
    return response.data
  },
  // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
  localize: async (url, id, data) => {
    const response = await fetcher(token).post(
      `/${url}/${id}/localizations`,
      data,
    )
    return response.data
  },
})
