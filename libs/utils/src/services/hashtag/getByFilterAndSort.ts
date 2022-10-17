import { useQuery, QueryKey } from '@tanstack/react-query'
import { Hashtag, Sort, StrapiLocale } from '@wsvvrijheid/types'

import { Request } from '../../lib'

type GetHashtagsArgs = {
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  sort?: Sort
  locale: StrapiLocale
  publicationState?: 'live' | 'preview'
}

export const getHashtagsByFilterAndSort = async ({
  page = 1,
  pageSize = 12,
  searchTerm,
  sort = ['date:desc'],
  publicationState = 'preview',
  locale,
  populate,
}: GetHashtagsArgs) => {
  const descriptionFilter = {
    description: {
      $containsi: searchTerm,
    },
  }

  const titleFilter = {
    title: {
      $containsi: searchTerm,
    },
  }

  const searchFilter = searchTerm && {
    $or: [descriptionFilter, titleFilter],
  }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
  }

  return Request.collection<Hashtag[]>({
    url: 'api/hashtags',
    filters,
    page,
    pageSize,
    locale,
    sort: sort || undefined,
    publicationState,
    populate,
  })
}

export const useHashtagsByFilterAndSort = (
  queryKey: QueryKey,
  args: GetHashtagsArgs,
) =>
  useQuery({
    queryKey,
    queryFn: () => getHashtagsByFilterAndSort(args),
    keepPreviousData: true,
  })
