import { AppSlug } from '@fc/types'

import { ports } from './config'

export const getVercelUrl = (project: AppSlug) => {
  if (process.env['CI'] === 'true') {
    return `https://${project}-git-dev-freedom-combination.vercel.app`
  }

  return `http://localhost:${ports[project]}`
}
