import { useQuery, QueryKey } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Post, Sort, StrapiLocale } from '@wsvvrijheid/types'

type GetPostsArgs = {
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  sort?: Sort
  locale: StrapiLocale
  publicationState?: 'live' | 'preview'
}

export const getPostsByFilterAndSort = async ({
  page = 1,
  pageSize = 12,
  searchTerm,
  sort = ['date:desc'],
  publicationState = 'preview',
  locale,
  populate,
}: GetPostsArgs) => {
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

  return Request.collection<Post[]>({
    url: 'api/posts',
    filters,
    page,
    pageSize,
    locale,
    sort: sort || undefined,
    publicationState,
    populate,
  })
}

export const usePostsByFilterAndSort = (
  queryKey: QueryKey,
  args: GetPostsArgs,
) =>
  useQuery({
    queryKey,
    queryFn: () => getPostsByFilterAndSort(args),
    keepPreviousData: true,
  })
