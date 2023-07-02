import { useQuery } from '@tanstack/react-query'

import { Request } from '@wsvvrijheid/lib'
import { Sort, StrapiLocale, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

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
  const urlsWithoutLocale = [
    'api/applicants',
    'api/categories',
    'api/comments',
    'api/donates',
    'api/feedbacks',
    'api/jobs',
    'api/lang-roles',
    'api/platforms',
    'api/tags',
    'api/users',
    'api/volunteers',
    'api/votes',
  ]

  const urlsWithLocalizedNames = [
    'api/arts',
    'api/categories',
    'api/jobs',
    'api/platforms',
    'api/tags',
  ]

  // const hasStatus = statuses && !urlsWithoutStatus.includes(url)
  const hasLocale = !urlsWithoutLocale.includes(url)

  const filterFields = fields?.map(field => {
    if (urlsWithLocalizedNames.includes(url))
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
