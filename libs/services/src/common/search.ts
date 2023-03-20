import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import {
  ApprovalStatus,
  Sort,
  StrapiLocale,
  StrapiModel,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { parse } from 'qs'

export type SearchModelArgs<T extends StrapiModel> = {
  capsStatuses?: ApprovalStatus[]
  categories?: string
  fields?: (keyof T)[]
  relationFilter?: {
    parent: keyof T
    ids: number[]
  }
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  populate?: string | string[]
  publicationState?: 'live' | 'preview'
  searchFields?: (keyof T)[]
  searchTerm?: string
  sort?: Sort
  statuses?: ApprovalStatus[]
  url: StrapiUrl
  username?: string
}

export const searchModel = async <T extends StrapiModel>({
  capsStatuses,
  categories,
  fields,
  relationFilter,
  locale = 'tr',
  page = 1,
  pageSize,
  populate,
  publicationState = 'preview',
  searchFields = ['title', 'description'] as unknown as (keyof StrapiModel)[],
  searchTerm,
  sort = ['publishedAt:desc'],
  statuses,
  url,
  username,
}: SearchModelArgs<T>) => {
  const urlsWithoutStatus: StrapiUrl[] = [
    'api/applicants',
    'api/categories',
    'api/comments',
    'api/donates',
    'api/feedbacks',
    'api/jobs',
    'api/lang-roles',
    'api/mentions',
    'api/platforms',
    'api/recommended-topics',
    'api/recommended-tweets',
    'api/tags',
    'api/timelines',
    'api/users',
    'api/volunteers',
    'api/votes',
  ]

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
    'api/timelines',
    'api/users',
    'api/volunteers',
    'api/votes',
  ]

  const urlsWithLocalizedNames = [
    'api/categories',
    'api/tags',
    'api/jobs',
    'api/platforms',
  ]

  const hasStatus = statuses && !urlsWithoutStatus.includes(url)
  const hasLocale = !urlsWithoutLocale.includes(url)
  const hasCapsStatus = capsStatuses && url === 'api/posts'

  const filterFields = fields?.map(field => {
    if (urlsWithLocalizedNames.includes(url))
      return `${String(field)}_${locale}`

    return field
  })

  const searchFilter = searchTerm && {
    $or: searchFields.map(field => ({
      [field]: {
        $containsi: searchTerm,
      },
    })),
  }

  const statusFilter = hasStatus && { approvalStatus: { $in: statuses } }

  const capsStatusFilter = hasCapsStatus && {
    capsStatus: { $in: capsStatuses },
  }

  let userFilter
  let categoryFilter

  if (url === 'api/arts') {
    if (username) {
      userFilter = {
        artist: { username: { $containsi: searchTerm || username } },
      }
    }
    if (categories) {
      categoryFilter = {
        categories: { slug: { $in: Object.values(parse(categories)) } },
      }
    }
  }

  const filterRelation = relationFilter?.ids
    ? relationFilter.ids?.length > 0 && {
        [relationFilter.parent]: { id: { $in: relationFilter.ids } },
      }
    : undefined

  const filtersArray = [
    searchFilter,
    statusFilter,
    capsStatusFilter,
    userFilter,
    categoryFilter,
    filterRelation,
  ].filter(Boolean)

  const filters =
    filtersArray && filtersArray.length > 0
      ? {
          $and: filtersArray,
        }
      : undefined

  return Request.collection<T[]>({
    url,
    filters,
    page,
    populate,
    fields: filterFields as (keyof T)[],
    pageSize,
    locale: hasLocale && locale ? locale : undefined,
    sort: sort || undefined,
    publicationState,
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
