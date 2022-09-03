import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Art, SessionUser } from '@wsvvrijheid/types'
import { useLocalStorage } from 'react-use'

import { mutation } from '../../lib'

type LikersMutationArgs = {
  id: number
  likers: number[]
}

type LikesMutationArgs = {
  id: number
  likes: number
}

const likeArtByUser = ({ id, likers }: LikersMutationArgs) =>
  mutation<Art>().put('api/arts', id, {
    data: { likers },
  })

const likeArtPublic = ({ id, likes }: LikesMutationArgs) =>
  mutation<Art>().put('api/arts', id, {
    data: { likes },
  })

const useLikeArtByUserMutation = () => {
  return useMutation({
    mutationKey: ['likeArtByUser'],
    mutationFn: likeArtByUser,
  })
}

const useLikeArtPublicMutation = () => {
  return useMutation({
    mutationKey: ['likeArtPublic'],
    mutationFn: likeArtPublic,
  })
}

export const useLikeArt = (
  art?: Art | null,
  user?: SessionUser | null,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()

  const likeArtByUserMutation = useLikeArtByUserMutation()
  const likeArtPublicMutation = useLikeArtPublicMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-art',
    [],
  )

  if (!art) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedStorage = likersStorage?.some(id => id === art.id)
  // FIXME This should be checked through API.
  // We might not have all the `likers` in the art data
  // as there should be a limit for it.
  const isLikedByUser =
    (user &&
      art.likers &&
      art.likers?.length > 0 &&
      art.likers?.some(({ id }) => id === user.id)) ||
    undefined

  const likersIds = art.likers?.map(liker => liker.id) || []

  let likers = likersIds

  if (isLikedByUser) {
    likers = likersIds.filter(id => id !== user?.id)
  } else if (user) {
    likers = [...likersIds, user.id]
  }

  const likes = isLikedStorage ? (art.likes || 0) - 1 : (art.likes || 0) + 1

  const toggleLike = async () => {
    if (user) {
      return likeArtByUserMutation.mutate(
        { id: art.id, likers },
        {
          onSuccess: async data => {
            await queryClient.invalidateQueries(queryKey)
          },
        },
      )
    }

    likeArtPublicMutation.mutate(
      { id: art.id, likes },
      {
        onSuccess: async data => {
          const a = await queryClient.invalidateQueries(queryKey)

          console.log('a', a)

          const isLiked = likersStorage?.some(id => id === art.id)
          const updatedStorage = isLiked
            ? likersStorage?.filter(id => id !== data.id)
            : [...(likersStorage || []), data.id]

          setLikersStorage(updatedStorage)
        },
      },
    )
  }

  return {
    toggleLike,
    isLiked: user ? isLikedByUser : isLikedStorage,
    isLoading:
      likeArtByUserMutation.isLoading || likeArtPublicMutation.isLoading,
  }
}
