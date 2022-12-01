import { useQuery, QueryKey } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { ApprovalStatus, Post, Sort, StrapiLocale } from '@wsvvrijheid/types'

type GetPostsArgs = {
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  sort?: Sort
  locale: StrapiLocale
  status?: ApprovalStatus
  publicationState?: 'live' | 'preview'
}

export const getPostsByFilterAndSort = async ({
  page = 1,
  pageSize = 12,
  searchTerm,
  sort = ['publishedAt:desc'],
  publicationState = 'preview',
  locale,
}: // status,
GetPostsArgs) => {
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
  // const approvalStatusFilter = {
  //   approvalStatus: {
  //     $eq: status || 'pending',
  //   },
  // }
  const searchFilter = searchTerm && {
    $or: [descriptionFilter, titleFilter],
  }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    // ...(approvalStatus || {}),
  }

  return Request.collection<Post[]>({
    url: 'api/posts',
    filters,
    page,
    pageSize,
    locale,
    sort: sort || undefined,
    publicationState,
    populate: ['image', 'localizations.image', 'hashtag', 'reference'],
  })
}
export const getCapsByFilterAndSort = async ({
  page = 1,
  pageSize = 12,
  searchTerm,
  sort = ['publishedAt:desc'],
  publicationState = 'preview',
  locale,
  populate,
  status,
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
  const capsStatusFilter = {
    capsStatus: {
      $eq: status || 'pending',
    },
  }
  const searchFilter = searchTerm && {
    $or: [descriptionFilter, titleFilter],
  }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    ...(capsStatusFilter || {}),
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

export const useCapsByFilterAndSort = (
  queryKey: QueryKey,
  args: GetPostsArgs,
) =>
  useQuery({
    queryKey,
    queryFn: () => getCapsByFilterAndSort(args),
    keepPreviousData: true,
  })
