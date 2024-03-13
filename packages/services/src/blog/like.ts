import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useDebounceValue, useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Blog, LikeMutationArgs } from '@fc/types'

import { useRecaptchaToken } from '../common'
import { useEffect, useState } from 'react'

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

  const initialLike = profile
    ? blog?.likers?.some(({ id }) => id === profile.id) ?? false
    : likersStorage?.some(id => id === blog?.id) ?? false

  const [isLiked, setIsLiked] = useState(initialLike)
  const [isLikedDebounced] = useDebounceValue(isLiked, 600)

  const likeCountWithoutMe =
    (blog?.likes ?? 0) + (blog?.likers?.length ?? 0) - (initialLike ? 1 : 0)

  useEffect(() => {
    if (!blog || initialLike === isLikedDebounced) return

    const toggleLike = async () => {
      if (profile) {
        return likeBlogMutation.mutate(
          { id: blog.id, type: isLikedDebounced ? 'unlike' : 'like' },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({ queryKey })
            },
          },
        )
      } else {
        return likeBlogMutation.mutate(
          { id: blog.id, type: isLikedDebounced ? 'unlike' : 'like' },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries({ queryKey })

              const updatedStorage = isLikedDebounced
                ? likersStorage?.filter(id => id !== blog.id)
                : [...(likersStorage || []), blog.id]

              setLikersStorage(updatedStorage as number[])
            },
          },
        )
      }
    }

    toggleLike()
  }, [isLikedDebounced, blog])

  if (!blog)
    return {
      toggleLike: () => null,
      likeCount: 0,
      isLiked: false,
      isLoading: false,
    }

  return {
    toggleLike: () => {
      setIsLiked(!isLiked)
    },
    isLiked: isLiked,
    likeCount: likeCountWithoutMe + (isLiked ? 1 : 0),
    isLoading: likeBlogMutation.isPending,
  }

}
