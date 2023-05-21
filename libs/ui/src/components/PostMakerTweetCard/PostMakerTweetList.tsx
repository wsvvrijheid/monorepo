import { FC } from 'react'

import { Divider, Stack } from '@chakra-ui/react'
import { shuffle } from 'lodash'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'
import { useHashtagContext } from '../HashtagProvider'
import { PostProvider } from '../PostProvider'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = () => {
  const { data } = useHashtagContext()

  if (!data) return null

  const posts = shuffle(data.posts || [])

  return (
    <Stack borderWidth={1} spacing={0} divider={<Divider />}>
      {posts.map(post => {
        return (
          <PostProvider key={post.id} post={post}>
            {post && <PostMakerTweetCard />}
          </PostProvider>
        )
      })}
    </Stack>
  )
}
