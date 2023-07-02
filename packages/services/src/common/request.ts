import { useQuery } from '@tanstack/react-query'

import { Request, RequestArgs } from '@wsvvrijheid/lib'
import { StrapiModel } from '@wsvvrijheid/types'

export const useRequestCollection = <T extends StrapiModel>(
  args: RequestArgs<T>,
) => {
  return useQuery({
    queryKey: Object.entries(args),
    queryFn: () => Request.collection<T>(args),
    keepPreviousData: true,
  })
}
