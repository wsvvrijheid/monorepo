import { useQuery } from '@tanstack/react-query'

import { urlsWithLocalizedTitle, urlsWithoutLocale } from '@wsvvrijheid/config'
import { Request } from '@wsvvrijheid/lib'
import {
  Sort,
  StrapiCollectionUrl,
  StrapiLocale,
  StrapiModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

export type SearchModelArgs<T extends StrapiModel> = {
  fields?: (keyof T)[]
  filters?: Record<string, unknown>
  includeDrafts?: boolean
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  populate?: string | string[]
  sort?: Sort
  url: StrapiUrl
}

export const searchModel = async <T extends StrapiModel>({
  fields,
  filters,
  includeDrafts = false,
  locale = 'tr',
  page = 1,
  pageSize,
  populate,
  sort = ['publishedAt:desc'],
  url,
}: SearchModelArgs<T>) => {
  const slug = url.split('/')[1] as StrapiCollectionUrl
  const hasLocale = !urlsWithoutLocale.includes(slug)

  const filterFields = fields?.map(field => {
    if (urlsWithLocalizedTitle.includes(slug))
      return `${field as string}_${locale}`

    return field
  })

  return Request.collection<T[]>({
    url,
    filters,
    page,
    populate,
    fields: filterFields as (keyof T)[],
    pageSize,
    locale: hasLocale && locale ? locale : undefined,
    sort: sort || undefined,
    includeDrafts,
  })
}

export const useSearchModel = <T extends StrapiModel>(
  args: SearchModelArgs<T>,
) => {
  return useQuery({
    queryKey: Object.entries(args),
    queryFn: () => searchModel<T>(args),
    keepPreviousData: true,
  })
}
