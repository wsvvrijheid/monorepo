import { Platform } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getPlatformBySlug = async (slug: string) => {
  const response = await request<Platform[]>({
    url: 'api/platforms',
    filters: { slug: { $eq: slug } },
  })

  return response?.data?.[0] || null
}
