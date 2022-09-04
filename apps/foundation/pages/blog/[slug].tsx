import { FC } from 'react'

import { dehydrate, QueryKey } from '@tanstack/react-query'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { BlogDetailTemplate } from '@wsvvrijheid/ui'
import { getBlogPaths, getBlogStaticProps } from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { GetStaticPropsContext } from 'next/types'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type BlogPageProps = {
  seo: NextSeoProps
  queryKey: QueryKey
  source: MDXRemoteSerializeResult
  authorBlogs: Blog[]
}

const BlogDetailPage: FC<BlogPageProps> = ({
  seo,
  queryKey,
  authorBlogs,
  source,
}) => {
  // const { user } = useAuth()
  //TODO: @ekrem user integration will be done
  return (
    <Layout seo={seo}>
      <BlogDetailTemplate
        auth={null}
        queryKey={queryKey}
        authorBlogs={authorBlogs}
        source={source}
      />
    </Layout>
  )
}

export default BlogDetailPage

export const getStaticPaths = async context => {
  const paths = await getBlogPaths(context.locales)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { blog, authorBlogs, seo, queryClient } = await getBlogStaticProps(
    context,
  )
  const locale = context.locale as StrapiLocale

  const source = await serialize(blog.content || '')

  return {
    props: {
      source,
      authorBlogs,
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
