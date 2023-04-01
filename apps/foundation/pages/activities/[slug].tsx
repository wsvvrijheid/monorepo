import { FC } from 'react'

import { Spinner } from '@chakra-ui/react'
import { dehydrate } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import {
  getActivityStaticProps,
  getModelStaticPaths,
} from '@wsvvrijheid/services'
import { StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import { ActivityDetail } from '@wsvvrijheid/ui'

import { Layout } from '../../components/index'
import i18nConfig from '../../next-i18next.config'

type ActivityDetailPageProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  image: UploadFile | string
}

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
  const { content, image, seo, queryClient } = await getActivityStaticProps(
    context,
  )
  const locale = context.locale as StrapiLocale

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
