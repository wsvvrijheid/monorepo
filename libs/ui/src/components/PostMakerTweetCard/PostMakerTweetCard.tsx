import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { PostMakerTweetButtons } from './PostMakerTweetButtons'
import { PostMakerTweetContent } from './PostMakerTweetContent'
import { PostMakerTweetTags } from './PostMakerTweetTags'
import { PostMakerTweetCardProps } from './types'
import { PostImage } from '../PostImage'

export const PostMakerTweetCard: FC<PostMakerTweetCardProps> = ({
  post,
  onMentionClick,
  onTrendClick,
  toggleMentionsModal,
  toggleTrendsModal,
}) => {
  if (!post.data) return null

  return (
    <Stack p={2} _hover={{ bg: 'blackAlpha.100' }}>
      <PostMakerTweetContent />
      <PostMakerTweetTags
        mentions={post.mentionUsernames}
        trends={post.trendNames}
        onMentionClick={onMentionClick}
        onTrendClick={onTrendClick}
      />
      <PostImage post={post.data} rounded="md" />
      <PostMakerTweetButtons
        post={post}
        toggleMentionsModal={toggleMentionsModal}
        toggleTrendsModal={toggleTrendsModal}
      />
    </Stack>
  )
}
