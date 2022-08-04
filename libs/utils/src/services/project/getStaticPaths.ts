import { getProjectPaths } from './paths'

export const getProjectStaticPaths = async () => {
  const paths = await getProjectPaths()

  return {
    paths,
    fallback: true,
  }
}
