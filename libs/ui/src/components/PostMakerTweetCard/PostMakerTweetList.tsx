import { FC } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'
import { useHashtagContext } from '../HashtagProvider'
import { PostProvider } from '../PostProvider'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = () => {
  const { data, postSentenceShares } = useHashtagContext()

  if (!data) return null

  const posts = data.posts || []

  const sortedPosts = posts.sort((a, b) => {
    const difference = postSentenceShares[a.id] - postSentenceShares[b.id]

    // If posts have the same share count
    // we want to randomly sort them
    if (difference === 0) {
      return Math.random() < 0.5 ? -1 : 1
    }

    return difference
  })

  return (
    <Stack borderWidth={1} spacing={0} divider={<Divider />}>
      {sortedPosts.map(post => {
        return (
          <PostProvider key={post.id} post={post}>
            {post && <PostMakerTweetCard />}
          </PostProvider>
        )
      })}
    </Stack>
  )
}
