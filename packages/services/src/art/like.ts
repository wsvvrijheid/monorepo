import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
import { Art, LikeMutationArgs } from '@wsvvrijheid/types'

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

export const useLikeArt = (art?: Art | null) => {
  const { profile } = useAuthContext()

  const likeArtMutation = useLikeArtMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-art',
    [],
  )

  if (!art) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedByUser =
    profile &&
    art.likers &&
    art.likers?.length > 0 &&
    art.likers?.some(({ id }) => id === profile.id)

  const isLikedStorage = likersStorage?.some(id => id === art.id)

  const toggleLike = () => {
    if (profile) {
      return likeArtMutation.mutate(
        { id: art.id, type: isLikedByUser ? 'unlike' : 'like' },
        // TODO: onSuccess
      )
    } else {
      likeArtMutation.mutate(
        { id: art.id, type: isLikedStorage ? 'unlike' : 'like' },
        {
          onSuccess: () => {
            const updatedStorage = isLikedStorage
              ? likersStorage?.filter(id => id !== art.id)
              : [...(likersStorage || []), art.id]
            setLikersStorage(updatedStorage as number[])
          },
        },
      )
    }
  }

  return {
    toggleLike,
    isLiked: profile ? isLikedByUser : isLikedStorage,
    isLoading: likeArtMutation.isPending,
  }
}
