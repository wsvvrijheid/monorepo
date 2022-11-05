import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Mention, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getMentions = async (locale: StrapiLocale) => {
  const response = await Request.collection<Mention[]>({
    url: 'api/mentions',
    locale,
  })
  return response?.data
}

export const useGetMentions = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['mentions', locale],
    queryFn: () => getMentions(locale as StrapiLocale),
    keepPreviousData: true,
  })
}
