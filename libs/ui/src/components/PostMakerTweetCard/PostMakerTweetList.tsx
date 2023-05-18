import { FC } from 'react'

import { Divider, Stack } from '@chakra-ui/react'
import { isEmpty } from 'lodash'

import { useHashtagContext } from '@wsvvrijheid/context'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = () => {
  const { posts } = useHashtagContext()

  if (isEmpty(posts)) return null

  return (
    <Stack
      borderWidth={1}
      spacing={0}
      divider={<Divider />}
      h={800}
      overflow={'auto'}
    >
      {Object.values(posts).map(post => {
        return (
          post.post && (
            <PostMakerTweetCard key={post.post.id} id={post.post.id} />
          )
        )
      })}
    </Stack>
  )
}
