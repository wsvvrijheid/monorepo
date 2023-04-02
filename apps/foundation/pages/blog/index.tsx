import { dehydrate, QueryClient } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getBlogs, useGetBlogs } from '@wsvvrijheid/services'
import { BlogTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

// TODO: Implement author filter
const Blogs = ({ seo }) => {
  const { data: blogs } = useGetBlogs()

  return (
    <Layout seo={seo} isDark>
      <BlogTemplate blogs={blogs} seo={seo} />
    </Layout>
  )
}

export default Blogs

export const getStaticProps = async context => {
  const queryClient = new QueryClient()

  const locale = context.locale

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
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
