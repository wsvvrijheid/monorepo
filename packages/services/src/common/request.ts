import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
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
  const auth = useAuthContext()
  const token = auth?.token as string

  return useQuery({
    queryKey: Object.entries(args),
    queryFn: () =>
      strapiRequest<T>({ ...args, ...(token && { token }) } as any),
    placeholderData: previousData => previousData,
    ...args.queryOptions,
  })
}

export { useStrapiRequest }
