import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'

import { ASSETS_URL, i18nConfig, SITE_URL } from '@wsvvrijheid/config'
import {
  getAuthorBlogs,
  getBlogBySlug,
  getModelStaticPaths,
  useGetBlogSlug,
  useLikeBlog,
  useViewBlog,
} from '@wsvvrijheid/services'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { BlogDetail, Container } from '@wsvvrijheid/ui'

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

  const title = blog?.title || ''
  const description = blog?.description || ''
  const adminUrl = ASSETS_URL
  const siteUrl = SITE_URL
  const image = blog.image
  const url = `${siteUrl}/${locale}/blog/${locale}`

  const authorBlogs =
    (await getAuthorBlogs(locale, blog?.author?.id as number, blog.id)) || []

  const seo = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      article: {
        publishedTime: blog.publishedAt as string,
        modifiedTime: blog.updatedAt as string,
        authors: [blog?.author?.name || blog?.author?.username || ''],
      },
      images: image
        ? [
            {
              url: adminUrl + image?.url,
              secureUrl: adminUrl + image?.url,
              type: image.mime,
              width: image.width,
              height: image.height,
              alt: title,
            },
          ]
        : [],
    },
  }

  const source = await serialize(blog?.content || '')

  return {
    props: {
      source,
      seo,
      queryKey,
      dehydrateState: dehydrate(queryClient),
      authorBlogs,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
