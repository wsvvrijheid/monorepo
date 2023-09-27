import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'

import {
  RequestCollectionArgs,
  RequestSingleArgs,
  strapiRequest,
} from '@wsvvrijheid/lib'
import {
  StrapiCollectionResponse,
  StrapiModel,
  StrapiSingleResponse,
} from '@wsvvrijheid/types'

function useStrapiRequest<T extends StrapiModel>(
  args: RequestSingleArgs & {
    queryOptions?: UseQueryOptions<unknown, unknown>
  },
): UseQueryResult<StrapiSingleResponse<T>>

function useStrapiRequest<T extends StrapiModel>(
  args: RequestCollectionArgs & {
    queryOptions?: UseQueryOptions<unknown, unknown>
  },
): UseQueryResult<StrapiCollectionResponse<T[]>>

function useStrapiRequest<T extends StrapiModel>(
  args: (RequestCollectionArgs | RequestSingleArgs) & {
    queryOptions?: UseQueryOptions<unknown, unknown>
  },
) {
  return useQuery({
    queryKey: Object.entries(args),
    queryFn: () => strapiRequest<T>(args as any),
    keepPreviousData: true,
    ...args.queryOptions,
  })
}

export { useStrapiRequest }
