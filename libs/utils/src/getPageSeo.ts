import { NextSeoProps } from 'next-seo'

import { API_URL, ROUTES } from '@wsvvrijheid/config'
import { Hashtag, Post, StrapiLocale } from '@wsvvrijheid/types'

import { getItemLink } from './getItemLink'

export const getPageSeo = (
  data: Hashtag | Post,
  locale: StrapiLocale,
  type: keyof typeof ROUTES | 'post',
): NextSeoProps => {
  const url = getItemLink(data as Hashtag | Post, locale, type, true) ?? ''

  const page = data as Hashtag
  const post = data as Post

  const title = page.title ?? post.hashtag?.title ?? ''
  const description = page.description ?? post.description ?? ''
  const image = data.image
  const adminUrl = API_URL as string

  const images = image && [
    {
      url: adminUrl + image.url,
      secureUrl: adminUrl + image.url,
      type: image.mime as string,
      width: image.width as number,
      height: image.height as number,
      alt: title,
    },
  ]

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images,
    },
  }
}
