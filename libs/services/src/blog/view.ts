import { useTimeout } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Blog, BlogUpdateInput } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'

import { useGetBlogSlug } from './getBlogBySlug'

export const viewBlog = async (blog: Blog, token: string) => {
  const body = { views: (blog.views || 0) + 1, token }

  return Mutation.put<Blog, BlogUpdateInput>('api/blogs', blog.id, body, token)
}

export const useViewBlog = async () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const { token } = useAuthSelector()

  const { data: blog } = useGetBlogSlug(slug as string)

  const [blogStorage, setBlogStorage] = useLocalStorage<number[]>(
    'view-blog',
    [],
  )

  const { mutate } = useMutation({
    mutationKey: ['viewblog', blog?.id],
    mutationFn: (blog: Blog) => viewBlog(blog, token as string),
    onSuccess: () => {
      blog && setBlogStorage([...(blogStorage || []), blog.id])
      queryClient.invalidateQueries(['blog', locale, slug])
    },
  })

  useTimeout(() => {
    const isViewed = blogStorage?.some(id => id === blog?.id)

    if (blog && !isViewed) {
      mutate(blog)
    }
  }, 10 * 1000)
}
