import { QueryKey, useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import {
  ApprovalStatus,
  Sort,
  StrapiLocale,
  StrapiModelKeys,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

type SearchModelArgs = {
  url: StrapiUrl
  populate?: string | string[]
  page?: number
  pageSize?: number
  searchTerm?: string
  searchFields?: Array<StrapiModelKeys>
  sort?: Sort
  locale: StrapiLocale
  publicationState?: 'live' | 'preview'
  statuses?: ApprovalStatus[]
  capsStatuses?: ApprovalStatus[]
}

export const searchModel = async <T extends StrapiTranslatableModel>({
  url,
  page = 1,
  pageSize = 12,
  searchTerm,
  searchFields = ['title', 'description'],
  sort = ['publishedAt:desc'],
  publicationState = 'preview',
  locale = 'tr',
  populate,
  statuses = ['approved'],
  capsStatuses,
}: SearchModelArgs) => {
  const searchFilter = searchTerm && {
    $or: searchFields.map(field => ({
      [field]: {
        $containsi: searchTerm,
      },
    })),
  }

  const statusFilter = {
    $or: statuses.map(status => ({
      approvalStatus: {
        $eq: status,
      },
    })),
  }

  const capsStatusFilter = capsStatuses && {
    $or: capsStatuses?.map(status => ({
      capsStatus: {
        $eq: status,
      },
    })),
  }

  const filters: { [key: string]: unknown } = {
    ...(searchFilter || {}),
    ...(statusFilter || {}),
    ...(capsStatusFilter || {}),
  }

  return Request.collection<T[]>({
    url,
    filters,
    page,
    populate,
    pageSize,
    locale,
    sort: sort || undefined,
    publicationState,
  })
}

export const useSearchModel = <T extends StrapiTranslatableModel>(
  queryKey: QueryKey,
  args: SearchModelArgs,
) =>
  useQuery({
    queryKey,
    queryFn: () => searchModel<T>(args),
    keepPreviousData: true,
  })
