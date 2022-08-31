import { useQuery } from '@tanstack/react-query'
import { Category, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { request } from '../../lib'

export const getArtCategories = async (locale: StrapiLocale) => {
  const response = await request()<Category[]>({
    url: 'api/categories',
    pageSize: 100,
    locale,
    filters: {
      arts: {
        locale: {
          $eq: locale,
        },
        status: {
          $eq: 'approved',
        },
      },
    },
  })

  return response?.data
}

export const useGetArtCategories = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['art-categories', locale],
    queryFn: () => getArtCategories(locale as StrapiLocale),
  })
}
