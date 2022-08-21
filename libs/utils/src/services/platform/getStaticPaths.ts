import { Platform } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getPlatformPaths = async () => {
  const response = await request()<Platform[]>({
    url: 'api/projects',
    populate: '',
  })

  const paths = response?.data?.map(({ code }) => ({ params: { code } }))

  return paths
}

export const getPlatformStaticPaths = async () => {
  const paths = await getPlatformPaths()

  return {
    paths,
    fallback: true,
  }
}
