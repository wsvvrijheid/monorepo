import { StrapiLocale, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

export type RequestArgs<T extends StrapiModel> = {
  url: StrapiUrl
  token?: string
  locale?: StrapiLocale
  fields?: (keyof T)[]
  filters?: { [key: string]: unknown }
  populate?: string | string[]
  sort?: string | string[]
  page?: number
  pageSize?: number
  includeDrafts?: boolean
}

export type RequestSingleArgs<T extends StrapiModel> = Pick<
  RequestArgs<T>,
  'url' | 'token' | 'locale' | 'fields' | 'populate' | 'includeDrafts'
> & { id?: number }
