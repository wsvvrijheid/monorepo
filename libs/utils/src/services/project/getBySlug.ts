import { Project } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getProjectBySlug = async (code: string) => {
  const response = await request()<Project[]>({
    url: 'api/projects',
    filters: { code: { $eq: code } },
  })

  return response?.data?.[0] || null
}
