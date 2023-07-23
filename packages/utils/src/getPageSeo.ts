import { NextSeoProps } from 'next-seo'

import { ROUTES } from '@wsvvrijheid/config'
import { Blog, Hashtag, Post, StrapiLocale } from '@wsvvrijheid/types'

import { getMediaUrl } from './getMediaUrl'
import { getItemLink } from './getItemLink'

export const getPageSeo = (
  data: Hashtag | Post | Blog,
  locale: StrapiLocale,
  type: keyof typeof ROUTES | 'post',
): NextSeoProps => {
  const url = getItemLink(data as Hashtag | Post, locale, type, true) ?? ''

  const page = data as Hashtag
  const post = data as Post
  const blog = data as Blog

  const title = page.title ?? post.hashtag?.title ?? ''
  const description = page.description ?? post.description ?? ''
  const image = data.image

  const images = image && [
    {
      url: getMediaUrl(image),
      secureUrl: getMediaUrl(image),
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
      ...(blog.author && {
        type: 'article',
        article: {
          publishedTime: blog.publishedAt as string,
          modifiedTime: blog.updatedAt as string,
          authors: [blog.author.name || blog.author.username || ''],
        },
      }),
    },
  }
}
