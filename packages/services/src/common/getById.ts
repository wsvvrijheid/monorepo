import { useQuery } from '@tanstack/react-query'

import {
  RequestSingleArgs,
  RequestByIdArgs,
  strapiRequest,
} from '@wsvvrijheid/lib'
import { StrapiModel } from '@wsvvrijheid/types'

export const getModelById = async <T extends StrapiModel>(
  args: RequestByIdArgs,
) => {
  const response = await strapiRequest<T>(args)

  return response?.data || null
}

export const useModelById = <T extends StrapiModel>(args: RequestByIdArgs) => {
  return useQuery({
    queryKey: [args.url, args.id],
    queryFn: () => getModelById<T>(args),
  })
}
