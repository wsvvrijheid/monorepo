import { FC } from 'react'

import { VStack } from '@chakra-ui/react'

import {
  PostMakerTweetCard,
  PostMakerTweetCardProps,
} from './PostMakerTweetCard'

export type PostMakerTweetListProps = {
  tweets: PostMakerTweetCardProps[]
}

export const PostMakerTweetList: FC<PostMakerTweetListProps> = ({ tweets }) => {
  return (
    <VStack spacing={0}>
      {tweets.map((tweet, i) => (
        <PostMakerTweetCard
          {...tweet}
          borderTop={i !== 0 ? 'none' : '1px solid gray'}
        />
      ))}
    </VStack>
  )
}
