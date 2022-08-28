import { Platform } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getAllPlatforms = async () => {
  const platforms = await request()<Platform[]>({ url: 'api/platforms' })
  if (!platforms) return
  return platforms?.data || null
}
