import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getBlogs, useGetBlogs } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { BlogTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

type BlogsProps = InferGetStaticPropsType<typeof getStaticProps>

// TODO: Implement author filter
const Blogs: FC<BlogsProps> = ({ seo }) => {
  const { data: blogs = [] } = useGetBlogs()

  return (
    <Layout seo={seo} isDark>
      <BlogTemplate blogs={blogs} seo={seo} />
    </Layout>
  )
}

export default Blogs

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  await queryClient.prefetchQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale),
  })

  const blogSeo = {
    en: {
      title: 'Blog',
      description: 'Posts',
    },
    nl: {
      title: 'Blog',
      description: 'Posts',
    },
    tr: {
      title: 'Blog',
      description: 'Yazılar',
    },
  }

  const seo = blogSeo[locale]

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
