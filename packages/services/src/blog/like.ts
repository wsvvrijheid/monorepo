import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from 'usehooks-ts'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import { Blog, BlogUpdateInput, SessionUser } from '@wsvvrijheid/types'

type LikersMutationArgs = {
  id: number
  likers: number[]
  user?: SessionUser
  token: string
}

type LikesMutationArgs = {
  id: number
  likes: number
  token: string
}

const likeBlogByUser = async ({
  id,
  likers,
  user,
  token,
}: LikersMutationArgs) => {
  if (!user) return

  const body = { likers }

  return Mutation.put<Blog, BlogUpdateInput>('blogs', id, body, token)
}

const likeBlogPublic = async ({ id, likes, token }: LikesMutationArgs) => {
  const body = { likes }

  return Mutation.put<Blog, BlogUpdateInput>('blogs', id, body, token)
}

const useLikeBlogByUserMutation = () => {
  return useMutation({
    mutationKey: ['likeBlogByUser'],
    mutationFn: likeBlogByUser,
  })
}

const useLikeBlogPublicMutation = () => {
  return useMutation({
    mutationKey: ['likeBlogPublic'],
    mutationFn: likeBlogPublic,
  })
}

export const useLikeBlog = (blog?: Blog | null, queryKey?: QueryKey) => {
  const queryClient = useQueryClient()

  const { user, token } = useAuthContext()

  const likeBlogByUserMutation = useLikeBlogByUserMutation()
  const likeBlogPublicMutation = useLikeBlogPublicMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-blog',
    [],
  )
  if (!blog) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedStorage = likersStorage?.some(id => id === blog?.id)
  const isLikedByUser =
    user &&
    blog?.likers &&
    blog?.likers?.length > 0 &&
    blog?.likers?.some(({ id }) => id === user.id)
  const likersIds = blog.likers?.map(liker => liker.id) || []

  let likers = likersIds

  if (isLikedByUser) {
    likers = likersIds.filter(id => id !== user?.id)
  } else if (user) {
    likers = [...likersIds, user.id]
  }
  const likes = isLikedStorage ? (blog.likes || 0) - 1 : (blog.likes || 0) + 1
  const toggleLike = async () => {
    if (user) {
      return likeBlogByUserMutation.mutate(
        { id: blog.id, likers, token: token as string, user },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(queryKey)
          },
        },
      )
    }

    likeBlogPublicMutation.mutate(
      { id: blog.id, likes, token: token as string },
      {
        onSuccess: async data => {
          await queryClient.invalidateQueries(queryKey)

          const isLiked = likersStorage?.some(id => id === blog.id)
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
      likeBlogByUserMutation.isLoading || likeBlogPublicMutation.isLoading,
  }
}
