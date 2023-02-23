import { useQuery } from 'react-query'

import { getArtComments } from './comments'

import { request } from '~lib'

export const getArtsByCategories = async (locale, categories, id) => {
  const response = await request({
    url: 'api/arts',
    locale,
    filters: {
      categories: { code: { $in: categories } },
      id: { $ne: id },
    },
    populate: ['artist.user.avatar', 'categories', 'images', 'likes'],
    sort: 'publishedAt:desc',
    pageSize: 4,
  })

  return response?.result || []
}

export const getArt = async (locale, slug) => {
  const response = await request({
    url: 'api/arts',
    filters: { slug: { $eq: slug } },
    populate: ['artist.user.avatar', 'categories', 'images'],
    locale,
  })

  const art = response.result?.[0]

  if (!art) return null

  const arts = await getArtsByCategories(
    locale,
    art.categories?.map(c => c.code),
    art.id,
  )

  const comments = await getArtComments(art.id)

  return { ...art, arts, comments }
}

export const useGetArt = (locale, slug) =>
  useQuery({
    queryKey: ['art', locale, slug],
    queryFn: () => getArt(locale, slug),
  })
