import { FC } from 'react'

import { dehydrate, QueryClient, QueryKey } from '@tanstack/react-query'
import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { BlogDetailTemplate } from '@wsvvrijheid/ui'
import { getAuthorBlogs, getBlogBySlug, getBlogPaths } from '@wsvvrijheid/utils'
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
  // const { user } = useAuth()
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

export const getStaticProps = async context => {
  const queryClient = new QueryClient()
  const locale = context.locale

  const slug = context.params?.slug

  await queryClient.prefetchQuery({
    queryKey: ['blog', locale, slug],
    queryFn: () => getBlogBySlug(locale, slug),
  })

  const blog = queryClient.getQueryData<Blog>(['blog', locale, slug])

  if (!blog) return { notFound: true }

  const slugs =
    blog.localizations?.reduce((acc, l) => {
      acc[l.locale] = l.slug
      return acc
    }, {}) || {}

  const title = blog?.title || null
  const description = blog?.description || null
  const adminUrl = API_URL
  const siteUrl = SITE_URL
  const image = blog.image
  const url = `${siteUrl}/${locale}/blog/${slugs[locale]}`

  const authorBlogs =
    (await getAuthorBlogs(locale, blog.author.id, blog.id)) || []

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
        authors: [blog.author.volunteer.name || blog.author.volunteer.username],
      },
      images: image
        ? [
            {
              url: adminUrl + image?.url,
              secureUrl: adminUrl + image?.url,
              type: image?.mime,
              width: image?.width,
              height: image?.height,
              alt: title,
            },
          ]
        : [],
    },
  }

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
