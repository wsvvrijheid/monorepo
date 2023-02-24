import { useQuery } from '@tanstack/react-query'
import { Request, RequestSingleArgs } from '@wsvvrijheid/lib'
import { StrapiModel } from '@wsvvrijheid/types'

export const getModelById = async <T extends StrapiModel>(
  args: RequestSingleArgs<T>,
) => {
  const response = await Request.single<T>(args)

  return response?.data || null
}

export const useModelById = <T extends StrapiModel>(
  args: RequestSingleArgs<T>,
) => {
  return useQuery({
    queryKey: [args.url, args.id],
    queryFn: () => getModelById(args),
  })
}
