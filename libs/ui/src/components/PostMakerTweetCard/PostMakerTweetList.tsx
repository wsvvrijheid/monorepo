import { FC } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import { PostState, useHashtagContext } from '@wsvvrijheid/context'

import { PostMakerTweetCard } from './PostMakerTweetCard'

export type PostMakerTweetListProps = {
  posts: PostState[]
}

export const PostMakerTweetList: FC<PostMakerTweetListProps> = ({ posts }) => {
  const { removeMentionFromPost, removeTrendFromPost } = useHashtagContext()

  const handleRemoveMention = (postId: number, mention: string) => {
    removeMentionFromPost(postId, mention)
  }

  const handleRemoveTrend = (postId: number, trend: string) => {
    removeTrendFromPost(postId, trend)
  }

  console.log('posts', posts)

  return (
    <Stack borderWidth={1} spacing={0} divider={<Divider />}>
      {posts.map(post => {
        const postId = post.data?.id as number

        return (
          <PostMakerTweetCard
            key={postId}
            post={post}
            onMentionClick={mention => handleRemoveMention(postId, mention)}
            onTrendClick={trend => handleRemoveTrend(postId, trend)}
            toggleMentionsModal={() => null}
            toggleTrendsModal={() => null}
          />
        )
      })}
    </Stack>
  )
}
