import { Project } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getAllProjects = async () => {
  const projects = await request()<Project[]>({ url: 'api/projects' })
  if (!projects) return
  return projects?.data || null
}
