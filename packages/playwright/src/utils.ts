import { AppSlug } from '@wsvvrijheid/types'

import { ports } from './config'

export const getVercelUrl = (project: AppSlug) => {
  if (process.env['CI'] === 'true') {
    return `https://${project}-git-dev-wsvvrijheid.vercel.app`
  }

  return `http://localhost:${ports[project]}`
}
