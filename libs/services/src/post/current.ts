import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Post } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const useCurrentPost = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const queryKey = ['post', locale, slug]

  const { data } = useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<Post>(queryKey),
  })

  return data
}
