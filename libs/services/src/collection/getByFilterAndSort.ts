import { useQuery, QueryKey } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Collection, Sort, StrapiLocale } from '@wsvvrijheid/types'

type GetCollectionsArgs = {
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  sort?: Sort
  locale: StrapiLocale
  publicationState?: 'live' | 'preview'
}

export const getCollectionsByFilterAndSort = async ({
  page = 1,
  pageSize = 12,
  searchTerm,
  sort = ['publishedAt:desc'],
  publicationState = 'preview',
  locale = 'tr',
}: GetCollectionsArgs) => {
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

  return Request.collection<Collection[]>({
    url: 'api/collections',
    filters,
    page,
    pageSize,
    locale,
    sort: sort || undefined,
    publicationState,
  })
}

export const useCollectionsByFilterAndSort = (
  queryKey: QueryKey,
  args: GetCollectionsArgs,
) =>
  useQuery({
    queryKey,
    queryFn: () => getCollectionsByFilterAndSort(args),
    keepPreviousData: true,
  })
