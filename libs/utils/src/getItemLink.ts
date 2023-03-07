import { ROUTES, SITE_URL } from '@wsvvrijheid/config'
import { Announcement, Hashtag, Post, StrapiLocale } from '@wsvvrijheid/types'

import { getMainPageLink } from './getMainPageLink'

export const getItemLink = (
  item: Hashtag | Post | Announcement,
  locale: StrapiLocale,
  type: keyof typeof ROUTES | 'post' | 'hashtag',
  isAbsolute?: boolean,
): string | null => {
  const post = item as Post
  const hashtag = item as Hashtag

  let itemUrl: string | null

  if (!item) {
    console.error('Missing item:', type, item)
    return null
  }

  switch (type) {
    case 'post':
      if (!post.hashtag?.slug) {
        console.error('Missing slug for post:', type, post)
        return null
      }
      itemUrl = `/${locale}/${getMainPageLink('hashtag')}/${
        post.hashtag?.slug
      }/${post.id}`
      break
    case 'hashtag':
      if (!hashtag.slug) {
        console.error('Missing slug for post:', type, hashtag)
        return null
      }
      itemUrl = `/${locale}/${getMainPageLink('hashtag')}/${hashtag?.slug}`
      break
    default:
      console.error('Missing slug for item:', type, item)
      itemUrl = null
      break
  }

  return isAbsolute ? SITE_URL + itemUrl : itemUrl
}
