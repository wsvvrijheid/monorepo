import { Activity, StrapiLocale } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getActivity = async (locale: StrapiLocale, slug: string) => {
  const response = await request()<Activity[]>({
    url: 'api/activities',
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response?.data?.[0] || null
}
