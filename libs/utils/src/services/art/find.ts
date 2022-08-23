import { Art, StrapiLocale } from '@wsvvrijheid/types'
import qs from 'qs'
import { useQuery } from 'react-query'

import { request } from '../../lib'

type GetArts = {
  categories: string
  populate: string | string[]
  page: number
  pageSize: number
  searchTerm: string
  username: string
  sort: string | string[]
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
    status: {
      $eq: 'approved',
    },
  }

  const searchFilter = username
    ? userFilter
    : searchTerm && {
        $or: [userFilter, titleFilter],
      }

  const categoryObj = qs.parse(categories)

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    categories: { code: { $in: Object.values(categoryObj) } },
    ...(statusFilter || {}),
  }
  return request()<Art>({
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
  queryKey: string,
  args: {
    categories: string
    populate: Array<string>
    page: number
    pageSize: number
    searchTerm: string
    username: string
    sort: Array<string>
    locale: StrapiLocale
  },
) =>
  useQuery({
    queryKey,
    queryFn: () => getArts(args),
  })
