import { FC } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import {
  PostState,
  addMentionToPost,
  addTrendToPost,
  useAppDispatch,
} from '@wsvvrijheid/store'

import { PostMakerTweetCard } from './PostMakerTweetCard'

export type PostMakerTweetListProps = {
  posts: PostState[]
}

export const PostMakerTweetList: FC<PostMakerTweetListProps> = ({ posts }) => {
  const dispatch = useAppDispatch()

  const handleAddMention = (postId: number, mention: string) => {
    dispatch(addMentionToPost({ postId, mention }))
  }

  const handleAddTrend = (postId: number, trend: string) => {
    dispatch(addTrendToPost({ postId, trend }))
  }

  return (
    <Stack borderWidth={1} spacing={0} divider={<Divider />}>
      {posts.map(post => {
        const postId = post.data?.id as number

        return (
          <PostMakerTweetCard
            key={postId}
            post={post}
            onAddMention={mention => handleAddMention(postId, mention)}
            onAddTrend={trend => handleAddTrend(postId, trend)}
            toggleMentionsModal={() => null}
            toggleTrendsModal={() => null}
          />
        )
      })}
    </Stack>
  )
}
