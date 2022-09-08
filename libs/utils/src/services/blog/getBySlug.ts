import { useQuery } from '@tanstack/react-query'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import * as dateFns from 'date-fns'
import { enIN as en, nl, tr } from 'date-fns/locale'
import { useRouter } from 'next/router'

import { request } from '../../lib/request'
import { getReadingTime } from '../../util'

export const getBlogBySlug = async (locale: StrapiLocale, slug: string) => {
  const response = await request<Blog[]>({
    url: 'api/blogs',
    populate: ['author.volunteer', 'image', 'likers'],
    filters: { slug: { $eq: slug } },
    locale,
  })

  return response?.data?.[0] || null
}

export const useGetBlog = (slug: string) => {
  const { locale } = useRouter()

  const { data, ...rest } = useQuery({
    queryKey: ['blog', locale, slug],
    queryFn: () => getBlogBySlug(locale as StrapiLocale, slug),
  })

  const { formattedDate } = useLocaleTimeFormat(
    data?.publishedAt as string,
    'dd MMMM yyyy',
  )
  const readingTime = getReadingTime(
    data?.content as string,
    locale as StrapiLocale,
  )

  const blog = data ? { ...data, formattedDate, readingTime } : null

  return { ...rest, data: blog }
}

export const timeLocale = { en, nl, tr }

export const useLocaleTimeFormat = (time: string, format: string) => {
  const { locale } = useRouter()

  if (!time || typeof window === 'undefined') return {}

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const date = new Date(
    (typeof time === 'string' ? new Date(time) : time).toLocaleString('en-US', {
      timeZone,
    }),
  )

  const differenceInHours = dateFns.differenceInHours(date, new Date())

  const formattedDateDistance = dateFns.formatDistanceToNowStrict(
    new Date(date),
    {
      locale: timeLocale[locale as StrapiLocale],
      unit: differenceInHours > 1 ? 'hour' : 'minute',
    },
  )

  const formattedDate = dateFns.format(date, format || 'dd MMMM yyyy', {
    locale: timeLocale[locale as StrapiLocale],
  })

  return { formattedDate, formattedDateDistance, date, timeZone }
}
