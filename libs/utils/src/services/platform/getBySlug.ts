import { Platform } from '@wsvvrijheid/types'

import { Request } from '../../lib'

export const getPlatformBySlug = async (slug: string) => {
  const response = await Request.collection<Platform[]>({
    url: 'api/platforms',
    filters: { slug: { $eq: slug } },
  })

  return response?.data?.[0] || null
}
