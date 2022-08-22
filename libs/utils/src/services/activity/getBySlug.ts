import { Activity, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { request } from '../../lib/request'

export const getActivityBySlug = async (locale: StrapiLocale, slug: string) => {
  const response = await request()<Activity[]>({
    url: 'api/activities',
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response?.data?.[0] || null
}

export const useActivity = (slug: string) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['activity', slug],
    queryFn: () => getActivityBySlug(locale as StrapiLocale, slug),
  })
}
