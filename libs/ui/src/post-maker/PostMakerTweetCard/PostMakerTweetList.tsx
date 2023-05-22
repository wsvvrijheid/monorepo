import { FC, useMemo } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'
import { useHashtagContext } from '../HashtagProvider'
import { PostProvider } from '../PostProvider'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = () => {
  const { data, postSentenceShares } = useHashtagContext()

  const sortedPosts = useMemo(() => {
    if (!data?.posts) return []

    return data.posts.sort((a, b) => {
      const difference =
        (postSentenceShares[a.id]?.leastShareCount || 0) -
        (postSentenceShares[b.id]?.leastShareCount || 0)

      // If posts have the same share count
      // we want to randomly sort them
      if (difference === 0) {
        return Math.random() < 0.5 ? -1 : 1
      }

      return difference
    })
  }, [postSentenceShares, data?.posts])

  return (
    <Stack>
      <Stack borderWidth={1} spacing={0} divider={<Divider />}>
        {sortedPosts.map(post => {
          return (
            <PostProvider key={post.id} post={post}>
              {post && <PostMakerTweetCard />}
            </PostProvider>
          )
        })}
      </Stack>
    </Stack>
  )
}
