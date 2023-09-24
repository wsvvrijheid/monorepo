import { ports } from './config'
import { ProjectApp } from './types'

export const getVercelUrl = (project: ProjectApp) => {
  if (process.env['CI'] === 'true') {
    return `https://${project}-git-dev-wsvvrijheid.vercel.app/`
  }

  return `http://localhost:${ports[project]}`
}
