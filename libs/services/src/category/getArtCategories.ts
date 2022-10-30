import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { ApprovalStatus, Category, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getArtCategories = async (
  locale: StrapiLocale,
  status?: ApprovalStatus,
) => {
  const response = await Request.collection<Category[]>({
    url: 'api/categories',
    pageSize: 100,
    locale,
    filters: {
      arts: {
        approvalStatus: {
          $eq: status || 'approved',
        },
      },
    },
  })

  return response?.data
}

export const useGetArtCategories = (status?: ApprovalStatus) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['art-categories', locale],
    queryFn: () => getArtCategories(locale as StrapiLocale, status),
    keepPreviousData: true,
  })
}
