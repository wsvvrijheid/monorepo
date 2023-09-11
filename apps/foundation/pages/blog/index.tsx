import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { getBlogs, useGetBlogs } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { BlogTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

// TODO: Implement author filter
const Blogs = () => {
  const { data: blogs = [] } = useGetBlogs()

  const { t } = useTranslation()

  const seo = { title: t('blogs') }

  return (
    <Layout seo={seo} isDark={!!blogs?.length}>
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
