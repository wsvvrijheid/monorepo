import { QueryClient } from '@tanstack/react-query'
import { Activity, StrapiLocale } from '@wsvvrijheid/types'
import { GetStaticPropsContext } from 'next/types'

import { getActivityBySlug } from './getBySlug'
export const getActivityStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const queryClient = new QueryClient()
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  await queryClient.prefetchQuery({
    queryKey: ['activity', locale, slug],
    queryFn: () => getActivityBySlug(locale, slug),
  })

  const activity = queryClient.getQueryData<Activity>([
    'activity',
    locale,
    slug,
  ])

  if (!activity) return { notFound: true }

  const slugs =
    activity?.localizations?.reduce((acc, l) => {
      acc[l?.locale] = l.slug
      return acc
    }, {}) || {}

  const title = activity.title || null
  const content = activity.content || null
  const image = activity.image || null

  const seo = {
    title,
    content,
  }

  return {
    seo,
    slugs: { ...slugs, [locale]: slug },
    image,
    content,
    queryClient,
  }
}
