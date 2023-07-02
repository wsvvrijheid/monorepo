import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { RequestCollectionArgs, strapiRequest } from '@wsvvrijheid/lib'
import { StrapiModel } from '@wsvvrijheid/types'

export const useRequestCollection = <T extends StrapiModel>(
  args: RequestCollectionArgs & {
    queryOptions?: UseQueryOptions<unknown, unknown>
  },
) => {
  return useQuery({
    queryKey: Object.entries(args),
    queryFn: () => strapiRequest<T>(args),
    keepPreviousData: true,
  })
}
