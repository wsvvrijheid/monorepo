import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
import { Blog, LikeMutationArgs } from '@wsvvrijheid/types'
import { useRecaptchaToken } from '../common'

const useLikeBlogMutation = () => {
  const { token } = useAuthContext()
  const recaptchaToken = useRecaptchaToken('blog_art')

  return useMutation({
    mutationKey: ['like-blog'],
    mutationFn: ({ id, type }: LikeMutationArgs) =>
      axios.put(
        `${API_URL}/api/${type}-blog/${id}`,
        { data: { recaptchaToken } },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
      ),
  })
}

export const useLikeBlog = (blog?: Blog | null, queryKey?: QueryKey) => {
  const queryClient = useQueryClient()

  const { profile } = useAuthContext()

  const likeBlogMutation = useLikeBlogMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-blog',
    [],
  )

  if (!blog) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedByUser =
    profile &&
    blog?.likers &&
    blog?.likers?.length > 0 &&
    blog?.likers?.some(({ id }) => id === profile.id)

  const isLikedStorage = likersStorage?.some(id => id === blog.id)

  const toggleLike = async () => {
    if (profile) {
      return likeBlogMutation.mutate(
        { id: blog.id, type: isLikedByUser ? 'unlike' : 'like' },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey })
          },
        },
      )
    } else {
      return likeBlogMutation.mutate(
        { id: blog.id, type: isLikedStorage ? 'unlike' : 'like' },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey })

            const updatedStorage = isLikedStorage
              ? likersStorage?.filter(id => id !== blog.id)
              : [...(likersStorage || []), blog.id]

            setLikersStorage([...new Set(updatedStorage)] as number[])
          },
        },
      )
    }
  }

  return {
    toggleLike,
    isLiked: profile ? isLikedByUser : isLikedStorage,
    isLoading: likeBlogMutation.isPending,
  }
}
