import { getAllPlatforms } from './getAll'

export const getPlatformPaths = async () => {
  const platforms = await getAllPlatforms()

  const paths = platforms?.map(({ slug }) => ({ params: { slug } }))

  return paths
}

export const getPlatformStaticPaths = async () => {
  const paths = await getPlatformPaths()

  return {
    paths,
    fallback: true,
  }
}
