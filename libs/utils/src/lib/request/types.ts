import { StrapiLocale, StrapiUrl } from '@wsvvrijheid/types'

export type RequestArgs = {
  url: StrapiUrl
  token?: string
  locale?: StrapiLocale
  fields?: string[]
  filters?: { [key: string]: unknown }
  populate?: string | string[]
  sort?: string | string[]
  page?: number
  pageSize?: number
  publicationState?: 'live' | 'preview'
}

export type RequestSingleArgs = Pick<
  RequestArgs,
  'url' | 'token' | 'locale' | 'fields' | 'populate' | 'publicationState'
> & { id?: number }
