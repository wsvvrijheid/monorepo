import { useQuery } from '@tanstack/react-query'
import { Category, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Request } from '../../lib'

export const getApprovedArtCategories = async (locale: StrapiLocale) => {
  const response = await Request.collection<Category[]>({
    url: 'api/categories',
    pageSize: 100,
    locale,
    filters: {
      arts: {
        locale: {
          $eq: locale,
        },
        approvalStatus: {
          $eq: 'approved',
        },
      },
    },
  })

  return response?.data
}

export const getArtCategories = async (locale: StrapiLocale) => {
  const response = await Request.collection<Category[]>({
    url: 'api/categories',
    pageSize: 100,
    locale,
  })

  return response?.data
}

export const useGetApprovedArtCategories = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['approved-art-categories', locale],
    queryFn: () => getApprovedArtCategories(locale as StrapiLocale),
    keepPreviousData: true,
  })
}

export const useGetArtCategories = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['art-categories', locale],
    queryFn: () => getArtCategories(locale as StrapiLocale),
    keepPreviousData: true,
  })
}
