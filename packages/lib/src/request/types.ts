import { Sort, StrapiLocale, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

export type RequestArgs<T extends StrapiModel> = {
  fields?: (keyof T)[]
  filters?: { [key: string]: unknown }
  includeDrafts?: boolean
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  populate?: string | string[]
  sort?: Sort
  token?: string
  url: StrapiUrl
}

export type RequestSingleArgs<T extends StrapiModel> = Omit<
  RequestArgs<T>,
  'filters' | 'page' | 'pageSize' | 'sort'
> & { id?: number }
