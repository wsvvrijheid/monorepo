import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { Request } from '@wsvvrijheid/lib'
import { Activity, StrapiLocale } from '@wsvvrijheid/types'

export const getActivityBySlug = async (
  locale: StrapiLocale,
  slug: string,
): Promise<Activity | null> => {
  const response = await Request.collection<Activity[]>({
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
