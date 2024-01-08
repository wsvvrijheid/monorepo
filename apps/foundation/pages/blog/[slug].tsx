import { FC } from 'react'

import { QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'

import { RECAPTCHA_SITE_KEY, SITE_URL } from '@wsvvrijheid/config'
import {
  getAuthorBlogs,
  getBlogBySlug,
  useLikeBlog,
  useViewBlog,
} from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { BlogDetail, Container } from '@wsvvrijheid/ui'
import { getPageSeo } from '@wsvvrijheid/utils'

import { Layout } from '../../components'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

type BlogPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const BlogDetailPage: FC<BlogPageProps> = ({
  seo,
  blog,
  queryKey,
  authorBlogs,
  source,
}) => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  useViewBlog()

  const { isLiked, toggleLike } = useLikeBlog(blog, queryKey)

  const link = `${SITE_URL}/${locale}/blog/${slug}`

  if (!source) return null

  // console.log('RECAPTCHA_SITE_KEY::', RECAPTCHA_SITE_KEY);


  return (
    <ReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <Layout seo={seo}>
        <Container maxW="container.md">
          <BlogDetail
            post={blog}
            source={source}
            link={link}
            isLiked={isLiked as boolean}
            toggleLike={toggleLike}
            authorBlogs={authorBlogs}
          />
        </Container>
      </Layout>
    </ReCaptchaProvider>
  )
}

export default BlogDetailPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string
  const queryKey = ['blog', locale, slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getBlogBySlug(locale, slug),
  })

  const blog = queryClient.getQueryData<Blog>(queryKey)

  if (!blog) return { notFound: true }

  const authorBlogs =
    (await getAuthorBlogs(locale, blog?.author?.id as number, blog.id)) || []

  const source = await serialize(blog?.content || '')

  const seo = getPageSeo(blog, 'blogs', locale)

  return {
    props: {
      blog,
      seo,
      source,
      queryKey,
      authorBlogs,
      ...(await ssrTranslations(locale)),
    },
  }
}
