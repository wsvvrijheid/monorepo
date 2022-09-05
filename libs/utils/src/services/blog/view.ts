import { useTimeout } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Blog } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'

import { mutation } from '../../lib'
import { useGetBlog } from './getBySlug'

export const viewBlog = async (blog: Blog) =>
  mutation<Blog>().put('api/blogs', blog.id, {
    data: { views: (blog.views || 0) + 1 },
  })

export const useViewBlog = async () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const { data: blog } = useGetBlog(slug as string)

  const [blogStorage, setBlogStorage] = useLocalStorage<number[]>(
    'view-blog',
    [],
  )

  const { mutate } = useMutation({
    mutationKey: ['viewblog', blog?.id],
    mutationFn: (blog: Blog) => viewBlog(blog),
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
