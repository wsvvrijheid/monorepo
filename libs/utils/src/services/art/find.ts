import { useQuery, QueryKey } from '@tanstack/react-query'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
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
}

export const getArts = async ({
  categories,
  populate = ['artist.user.avatar', 'categories', 'images', 'likers'],
  page = 1,
  pageSize,
  searchTerm,
  username,
  sort,
  locale,
}: GetArts) => {
  const userFilter = {
    artist: {
      user: {
        username: {
          $containsi: searchTerm || username,
        },
      },
    },
  }

  const titleFilter = {
    title: {
      $containsi: searchTerm,
    },
  }

  const statusFilter = {
    translationStatus: {
      $eq: 'approved',
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
      code: {
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

export const useArts = (
  queryKey: QueryKey,
  args: {
    categories?: string
    populate?: Array<string>
    page?: number
    pageSize?: number
    searchTerm?: string
    username?: string
    sort?: Array<string>
    locale: StrapiLocale
  },
) =>
  useQuery({
    queryKey,
    queryFn: () => getArts(args),
    keepPreviousData: true,
  })
