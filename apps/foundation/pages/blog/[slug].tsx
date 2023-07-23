import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'
import { serialize } from 'next-mdx-remote/serialize'

import { SITE_URL } from '@wsvvrijheid/config'
import {
  getAuthorBlogs,
  getBlogBySlug,
  getModelStaticPaths,
  useGetBlogSlug,
  useLikeBlog,
  useViewBlog,
} from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { BlogDetail, Container } from '@wsvvrijheid/ui'
import { getPageSeo } from '@wsvvrijheid/utils'

import { Layout } from '../../components'

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogDetailPage: FC<BlogPageProps> = ({
  seo,
  queryKey,
  authorBlogs,
  source,
}) => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  const { data: blog } = useGetBlogSlug(slug as string)

  useViewBlog()
  const { isLiked, toggleLike } = useLikeBlog(blog, queryKey)

  const link = `${SITE_URL}/${locale}/blog/${slug}`

  if (!source || !blog) return null

  return (
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
  )
}

export default BlogDetailPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('api/blogs')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
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

  const seo = getPageSeo(blog, locale, 'blog')

  const source = await serialize(blog?.content || '')

  return {
    props: {
      source,
      seo,
      queryKey,
      dehydrateState: dehydrate(queryClient),
      authorBlogs,
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
