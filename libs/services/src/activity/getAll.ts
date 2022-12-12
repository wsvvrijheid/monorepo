import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Activity, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

export const getAllActivities = async (locale: StrapiLocale) => {
  const response = await Request.collection<Activity[]>({
    url: 'api/activities',
    pageSize: 100,
    locale,
  })

  return response?.data
}

export const useActivities = () => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['activities', locale],
    queryFn: () => getAllActivities(locale as StrapiLocale),
  })
}
