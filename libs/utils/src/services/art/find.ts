import { useQuery, QueryKey } from '@tanstack/react-query'
import { ApprovalStatus, Art, Sort, StrapiLocale } from '@wsvvrijheid/types'
import qs from 'qs'

import { request } from '../../lib'

type GetArts = {
  categories?: string
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  username?: string
  sort?: Sort
  locale: StrapiLocale
  status?: ApprovalStatus
  publicationState?: 'live' | 'preview'
}

export const getArts = async ({
  categories,
  populate = ['artist.avatar', 'categories', 'images', 'likers'],
  page = 1,
  pageSize = 12,
  searchTerm,
  username,
  sort = ['publishedAt:desc'],
  locale,
  status,
  publicationState,
}: GetArts) => {
  const userFilter = {
    artist: {
      username: {
        $containsi: searchTerm || username,
      },
    },
  }

  const titleFilter = {
    title: {
      $containsi: searchTerm,
    },
  }

  // By default we only show approved arts in the club page
  // But in Admin project, editors should be able to see also
  // pending and rejected arts
  // TODO: Allow user to filter by approvalStatus (see: ApprovalStatus)
  const statusFilter = {
    approvalStatus: {
      $eq: status || 'approved',
    },
  }

  const searchFilter = username
    ? userFilter
    : searchTerm && {
        $or: [userFilter, titleFilter],
      }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    ...(statusFilter || {}),
  }

  if (categories) {
    filters['categories'] = {
      slug: {
        $in: Object.values(qs.parse(categories)),
      },
    }
  }
  return request<Art[]>({
    url: 'api/arts',
    filters,
    page,
    pageSize,
    sort: sort || undefined,
    locale,
    populate,
    publicationState,
  })
}

export const useArts = (queryKey: QueryKey, args: GetArts) =>
  useQuery({
    queryKey,
    queryFn: () => getArts(args),
    keepPreviousData: true,
  })
