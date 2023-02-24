import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { getBlogStaticProps, getModelStaticPaths } from '@wsvvrijheid/services'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { BlogDetailTemplate } from '@wsvvrijheid/ui'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

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
  return (
    <Layout seo={seo}>
      <BlogDetailTemplate
        queryKey={queryKey}
        authorBlogs={authorBlogs}
        source={source}
      />
    </Layout>
  )
}

export default BlogDetailPage

export const getStaticPaths: GetStaticPaths = async context => {
  return await getModelStaticPaths(
    'api/blogs',
    context.locales as StrapiLocale[],
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { blog, ...rest } = await getBlogStaticProps(context)
  const locale = context.locale as StrapiLocale

  const source = await serialize(blog?.content || '')

  return {
    props: {
      source,
      ...rest,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
