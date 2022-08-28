import { Platform } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getPlatformBySlug = async (code: string) => {
  const response = await request()<Platform[]>({
    url: 'api/platforms',
    filters: { code: { $eq: code } },
  })

  return response?.data?.[0] || null
}
