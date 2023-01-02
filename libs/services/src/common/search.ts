import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import {
  ApprovalStatus,
  Sort,
  StrapiLocale,
  StrapiModel,
  StrapiModelKeys,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { parse } from 'qs'

export type SearchModelArgs = {
  capsStatuses?: ApprovalStatus[]
  categories?: string
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  populate?: string | string[]
  publicationState?: 'live' | 'preview'
  searchFields?: Array<StrapiModelKeys>
  searchTerm?: string
  sort?: Sort
  statuses?: ApprovalStatus[]
  url: StrapiUrl
  username?: string
}

export const searchModel = async <T extends StrapiModel>({
  capsStatuses,
  categories,
  locale = 'tr',
  page = 1,
  pageSize,
  populate,
  publicationState = 'preview',
  searchFields = ['title', 'description'],
  searchTerm,
  sort = ['publishedAt:desc'],
  statuses,
  url,
  username,
}: SearchModelArgs) => {
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
    'api/recommended-tweets',
    'api/tags',
    'api/timelines',
    'api/users',
    'api/volunteers',
    'api/votes',
  ]

  const hasStatus = !urlsWithoutStatus.includes(url)
  const hasLocale = !urlsWithoutLocale.includes(url)
  const hasCapsStatus = url === 'api/posts'

  const searchFilter = searchTerm && {
    $or: searchFields.map(field => ({
      [field]: {
        $containsi: searchTerm,
      },
    })),
  }

  const statusFilter = statuses &&
    hasStatus && {
      $or: statuses.map(status => ({
        approvalStatus: {
          $eq: status,
        },
      })),
    }

  const capsStatusFilter = capsStatuses &&
    hasCapsStatus && {
      $or: capsStatuses?.map(status => ({
        capsStatus: {
          $eq: status,
        },
      })),
    }

  let userFilter = {}
  let categoryFilter = {}

  if (url === 'api/arts') {
    if (username) {
      userFilter = {
        artist: {
          username: {
            $containsi: searchTerm || username,
          },
        },
      }
    }

    if (categories) {
      categoryFilter = {
        slug: {
          $in: Object.values(parse(categories)),
        },
      }
    }
  }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    ...(statusFilter || {}),
    ...(capsStatusFilter || {}),
    ...(userFilter || {}),
    ...(categoryFilter || {}),
  }

  return Request.collection<T[]>({
    url,
    filters,
    page,
    populate,
    pageSize,
    locale: hasLocale && locale ? locale : undefined,
    sort: sort || undefined,
    publicationState,
  })
}

export const useSearchModel = <T extends StrapiModel>(
  args: SearchModelArgs,
) => {
  return useQuery({
    queryKey: Object.values(args),
    queryFn: () => searchModel<T>(args),
    keepPreviousData: true,
  })
}
