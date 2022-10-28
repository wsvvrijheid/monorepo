import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Collection, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getAllCollections = async (locale: StrapiLocale) => {
  const response = await Request.collection<Collection[]>({
    url: 'api/collections',
    pageSize: 100,
    locale,
  })

  return response?.data
}

export const useCollections = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['collections', locale],
    queryFn: () => getAllCollections(locale as StrapiLocale),
  })
}
