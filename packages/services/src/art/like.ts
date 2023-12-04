import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
import { Art } from '@wsvvrijheid/types'

import { useRecaptchaToken } from '../common'

const useLikeArtMutation = () => {
  const { token } = useAuthContext()
  const recaptchaToken = useRecaptchaToken('like_art')

  return useMutation({
    mutationKey: ['like-art'],
    mutationFn: ({ id, type }: { id: number; type: 'like' | 'unlike' }) =>
      axios.put(
        `${API_URL}/api/${type}-art/${id}`,
        { data: { recaptchaToken } },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
      ),
  })
}

export const useLikeArt = (art?: Art | null, queryKey?: QueryKey) => {
  const queryClient = useQueryClient()

  const likeArtMutation = useLikeArtMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-art',
    [],
  )

  if (!art) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedStorage = likersStorage?.some(id => id === art.id)
  const isLiked = art.isLiked || isLikedStorage

  const toggleLike = async () => {
    likeArtMutation.mutate(
      { id: art.id, type: isLikedStorage ? 'unlike' : 'like' },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey })

          const isLiked = likersStorage?.some(id => id === art.id)
          const updatedStorage = isLiked
            ? likersStorage?.filter(id => id !== art.id)
            : [...(likersStorage || []), art.id]
          setLikersStorage(updatedStorage as number[])
        },
      },
    )
  }

  return {
    toggleLike,
    isLiked,
    isLoading: likeArtMutation.isPending,
  }
}
