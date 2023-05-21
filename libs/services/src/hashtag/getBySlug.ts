import { useQuery } from '@tanstack/react-query'
import { addDays, isPast } from 'date-fns'
import { useRouter } from 'next/router'

import { Request } from '@wsvvrijheid/lib'
import { Hashtag, HashtagReturnType, StrapiLocale } from '@wsvvrijheid/types'

export const getHashtagBySlug = async (
  locale: StrapiLocale,
  slug: string,
): Promise<HashtagReturnType | null> => {
  const response = await Request.collection<Hashtag[]>({
    url: 'api/hashtags',
    filters: { slug: { $eq: slug } },
    locale,
    populate: ['image', 'mentions', 'posts.image', 'localizations'],
  })

  if (!response || !response?.data || !response.data.length) return null

  const hashtag = response.data[0]

  const hasPassed = isPast(addDays(new Date(hashtag.date as string), 1))
  const hasStarted = isPast(new Date(hashtag.date as string))
  const defaultHashtags =
    ((hashtag.hashtagDefault || hashtag.hashtagExtra) &&
      ([hashtag.hashtagDefault, hashtag.hashtagExtra].filter(
        h => !!h,
      ) as string[])) ||
    []

  const posts =
    hashtag.posts
      ?.filter(p => p.image)
      .map((p, index) => ({ ...p, index, hashtag })) || []

  return { ...hashtag, posts, hasPassed, hasStarted, defaultHashtags }
}

export const useHashtag = () => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  return useQuery({
    queryKey: ['hashtag', locale, slug],
    queryFn: () => getHashtagBySlug(locale as StrapiLocale, slug as string),
  })
}
