import { FC } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import { PostProvider, useHashtagContext } from '@wsvvrijheid/context'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = () => {
  const { data } = useHashtagContext()

  if (!data) return null

  return (
    <Stack borderWidth={1} spacing={0} divider={<Divider />}>
      {data.posts?.map(post => {
        return (
          <PostProvider key={post.id} post={post}>
            {post && <PostMakerTweetCard />}
          </PostProvider>
        )
      })}
    </Stack>
  )
}
