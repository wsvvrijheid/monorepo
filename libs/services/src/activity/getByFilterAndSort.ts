import { useQuery, QueryKey } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'

type GetActivitiesArgs = {
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  sort?: Sort
  locale: StrapiLocale
  publicationState?: 'live' | 'preview'
  status?: ApprovalStatus
}

export const getActivitiesByFilterAndSort = async ({
  page = 1,
  pageSize = 12,
  searchTerm,
  sort = ['publishedAt:desc'],
  publicationState = 'preview',
  locale = 'tr',
  status,
}: GetActivitiesArgs) => {
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

  const statusFilter = {
    approvalStatus: {
      $eq: status || 'approved',
    },
  }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    ...(statusFilter || {}),
  }

  return Request.collection<Activity[]>({
    url: 'api/activities',
    filters,
    page,
    pageSize,
    locale,
    sort: sort || undefined,
    publicationState,
  })
}

export const useActivitiesByFilterAndSort = (
  queryKey: QueryKey,
  args: GetActivitiesArgs,
) =>
  useQuery({
    queryKey,
    queryFn: () => getActivitiesByFilterAndSort(args),
    keepPreviousData: true,
  })
