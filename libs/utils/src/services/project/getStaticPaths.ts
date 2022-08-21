import { Project } from '@wsvvrijheid/types'

import { request } from '../../lib'

export const getProjectPaths = async () => {
  const response = await request()<Project[]>({
    url: 'api/projects',
    populate: '',
  })

  const paths = response?.data?.map(({ code }) => ({ params: { code } }))

  return paths
}

export const getProjectStaticPaths = async () => {
  const paths = await getProjectPaths()

  return {
    paths,
    fallback: true,
  }
}
