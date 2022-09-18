import { useQuery, QueryKey } from '@tanstack/react-query'
import { ApprovalStatus, Art, StrapiLocale } from '@wsvvrijheid/types'
import qs from 'qs'

import { request } from '../../lib'

type GetArts = {
  categories?: string
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  username?: string
  sort?: string | string[]
  locale: StrapiLocale
  status?: ApprovalStatus
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
      $eq: status,
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
    sort: sort || ['publishedAt:desc'],
    locale,
    populate,
  })
}

export const useArts = (queryKey: QueryKey, args: GetArts) =>
  useQuery({
    queryKey,
    queryFn: () => getArts(args),
    keepPreviousData: true,
  })
