import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { LikeMutationArgs } from '@fc/types'

import { useArtBySlug } from './getBySlug'
import { useRecaptchaToken } from '../common'

const useLikeArtMutation = () => {
  const { token } = useAuthContext()
  const recaptchaToken = useRecaptchaToken('like_art')

  return useMutation({
    mutationKey: ['like-art'],
    mutationFn: ({ id, type }: LikeMutationArgs) =>
      axios.put(
        `${API_URL}/api/${type}-art/${id}`,
        { data: { recaptchaToken } },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
      ),
  })
}

export const useLikeArt = () => {
  const { profile } = useAuthContext()
  const { data: art, refetch } = useArtBySlug()

  const likeArtMutation = useLikeArtMutation()
  const [isDisabled, setIsDisabled] = useState(false)
  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-art',
    [],
  )

  if (!art) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedByUser = profile && (art.isLiked ?? false)

  const isLikedStorage = likersStorage?.some(id => id === art.id)

  const handleError = (error: any) => {
    console.error('ART_BLOG_ERROR', error)
    if (error.response.status === 403) {
      setIsDisabled(true)
    }
  }

  const toggleLike = () => {
    if (profile) {
      return likeArtMutation.mutate(
        { id: art.id, type: isLikedByUser ? 'unlike' : 'like' },
        {
          onSuccess: async () => {
            refetch()
          },
          onError: handleError,
        },
      )
    }

    return likeArtMutation.mutate(
      { id: art.id, type: isLikedStorage ? 'unlike' : 'like' },
      {
        onSuccess: async () => {
          const updatedStorage = isLikedStorage
            ? likersStorage?.filter(id => id !== art.id)
            : [...(likersStorage || []), art.id]
          setLikersStorage(updatedStorage as number[])

          await refetch()
        },
        onError: handleError,
      },
    )
  }

  return {
    toggleLike,
    isLiked: profile ? isLikedByUser : isLikedStorage,
    isLoading: likeArtMutation.isPending,
    isDisabled,
  }
}
