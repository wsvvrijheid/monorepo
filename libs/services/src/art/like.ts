import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Art, ArtUpdateInput } from '@wsvvrijheid/types'
import { useLocalStorage } from 'usehooks-ts'

type LikersMutationArgs = {
  id: number
  likers: number[]
  token: string
}

type LikesMutationArgs = {
  id: number
  likes: number
  token: string
}

const likeArtByUser = ({ id, likers, token }: LikersMutationArgs) => {
  const body = { likers, token }

  return Mutation.put<Art, ArtUpdateInput>('api/arts', id, body, token)
}

// TODO: Create new route, no token needed
const likeArtPublic = ({ id, likes, token }: LikesMutationArgs) => {
  const body = { likes, token }

  return Mutation.put<Art, ArtUpdateInput>('api/arts', id, body, token)
}

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

export const useLikeArt = (art?: Art | null, queryKey?: QueryKey) => {
  const queryClient = useQueryClient()

  const { user, token } = useAuthSelector()

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
    (user && art.likers && art.likers?.some(({ id }) => id === user.id)) ||
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
        { id: art.id, likers, token: token as string },
        {
          onSuccess: async data => {
            await queryClient.invalidateQueries(queryKey)
          },
        },
      )
    }

    likeArtPublicMutation.mutate(
      { id: art.id, likes, token: token as string },
      {
        onSuccess: async data => {
          await queryClient.invalidateQueries(queryKey)

          const isLiked = likersStorage?.some(id => id === art.id)
          const updatedStorage = isLiked
            ? likersStorage?.filter(id => id !== data?.id)
            : [...(likersStorage || []), data?.id]

          setLikersStorage(updatedStorage as number[])
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
