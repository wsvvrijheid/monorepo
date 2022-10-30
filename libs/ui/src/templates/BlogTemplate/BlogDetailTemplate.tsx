/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { SITE_URL } from '@wsvvrijheid/config'
import { useGetBlog, useLikeBlog, useViewBlog } from '@wsvvrijheid/services'
import { Blog } from '@wsvvrijheid/types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'

import { Container } from '../../components'
import { BlogDetail } from '../../components/BlogDetail'

export type BlogDetailTemplateProps = {
  queryKey: QueryKey
  authorBlogs: Blog[]
  source: MDXRemoteSerializeResult
}

export const BlogDetailTemplate: FC<BlogDetailTemplateProps> = ({
  queryKey,
  source,
  authorBlogs,
}) => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  if (!source) return null
  const { data: blog } = useGetBlog(slug as string)
  if (!blog) return null
  const { isLiked, toggleLike } = useLikeBlog(blog, queryKey)

  const link = `${SITE_URL}/${locale}/blog/${slug}`

  useViewBlog()

  return (
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
  )
}
