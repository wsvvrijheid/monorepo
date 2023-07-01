import { FC } from 'react'

import { Spinner } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'

import i18nConfig from '@wsvvrijheid/config/next-i18next.config'
import { getActivityBySlug, getModelStaticPaths } from '@wsvvrijheid/services'
import { Activity, StrapiLocale } from '@wsvvrijheid/types'
import { ActivityDetail } from '@wsvvrijheid/ui'

import { Layout } from '../../components/index'

type ActivityDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>

const ActivityDetailPage: FC<ActivityDetailPageProps> = ({
  seo,
  source,
  image,
}) => {
  if (!source) return <Spinner />

  return (
    <Layout seo={seo}>
      <ActivityDetail image={image} source={source} title={seo.title} />
    </Layout>
  )
}
export default ActivityDetailPage

export const getStaticPaths: GetStaticPaths = async context => {
  return await getModelStaticPaths(
    'api/activities',
    context.locales as StrapiLocale[],
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
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

  const title = activity.title || ''
  const content = activity.content || ''
  const image = activity.image || ''

  const seo = { title, content }

  const source = await serialize(content || '')

  return {
    props: {
      seo,
      image,
      source,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
