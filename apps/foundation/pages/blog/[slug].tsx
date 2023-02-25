import { FC } from 'react'

import { Container } from '@chakra-ui/react'
import { dehydrate, QueryClient, QueryKey } from '@tanstack/react-query'
import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import {
  getAuthorBlogs,
  getBlogBySlug,
  getModelStaticPaths,
  useGetBlogSlug,
  useLikeBlog,
  useViewBlog,
} from '@wsvvrijheid/services'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { BlogDetail } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
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

export const getStaticPaths: GetStaticPaths = async context => {
  return await getModelStaticPaths(
    'api/blogs',
    context.locales as StrapiLocale[],
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  await queryClient.prefetchQuery({
    queryKey: ['blog', locale, slug],
    queryFn: () => getBlogBySlug(locale, slug),
  })

  const blog = queryClient.getQueryData<Blog>(['blog', locale, slug])

  if (!blog) return { notFound: true }

  const title = blog?.title || null
  const description = blog?.description || null
  const adminUrl = API_URL
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
        publishedTime: blog.publishedAt,
        modifiedTime: blog.updatedAt,
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
      dehydrateState: dehydrate(queryClient),
      authorBlogs,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
