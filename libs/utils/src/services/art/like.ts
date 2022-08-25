import { Art, User } from '@wsvvrijheid/types'
import { QueryKey, useMutation, useQueryClient } from 'react-query'
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

type UseLikeArtProps = {
  art?: Art | null
  user?: User
  queryKey?: QueryKey
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
    mutationKey: 'likeArtByUser',
    mutationFn: likeArtByUser,
  })
}

const useLikeArtPublicMutation = () => {
  return useMutation({
    mutationKey: ['likeArtPublic'],
    mutationFn: likeArtPublic,
  })
}

export const useLikeArt = ({ art, user, queryKey }: UseLikeArtProps) => {
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
    user &&
    art.likers &&
    art.likers?.length > 0 &&
    art.likers?.some(({ id }) => id === user.id)

  const likersIds = art.likers?.map(liker => liker.id) || []

  let likers = likersIds

  if (isLikedByUser) {
    likers = likersIds.filter(id => id !== user?.id)
  } else if (user) {
    likers = [...likersIds, user.id]
  }

  const likes = isLikedStorage ? (art.likes || 0) - 1 : (art.likes || 0) + 1

  const invalidateQueries = (
    updatedArt: Art,
    isSinglePage: boolean,
    queryKey: QueryKey,
  ) => {
    if (isSinglePage) {
      // Invalidate only the current art in the page
      return queryClient.invalidateQueries(queryKey)
    }

    // Update the art from the art list
    const fetchedArts = queryClient.getQueryData<{ data: Art[] }>(queryKey)
    const updatedArts = fetchedArts?.data.map(art => {
      if (art.id === updatedArt.id) {
        return { ...art, likes: updatedArt.likes }
      }
      return art
    })

    return queryClient.setQueryData(queryKey, {
      ...fetchedArts,
      data: updatedArts,
    })
  }

  const toggleLike = async (isSinglePage: boolean) => {
    if (user) {
      return likeArtByUserMutation.mutate(
        { id: art.id, likers },
        {
          onSuccess: data => {
            queryKey && invalidateQueries(data, isSinglePage, queryKey)
          },
        },
      )
    }

    likeArtPublicMutation.mutate(
      { id: art.id, likes },
      {
        onSuccess: async data => {
          queryKey && (await invalidateQueries(data, isSinglePage, queryKey))
          // TODO Find a better way of getting updated storage

          console.log('data', data)

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
