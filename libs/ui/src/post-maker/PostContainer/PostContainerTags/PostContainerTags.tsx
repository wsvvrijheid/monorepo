import { Box } from '@chakra-ui/react'

import { PostContainerMentionTags } from './PostContainerMentionTags'
import { PostContainerTrendTags } from './PostContainerTrendTags'

export const PostContainerTags = () => {
  return (
    <Box mt={2} data-tour-mob="step-post-added" data-tour="step-post-added">
      <PostContainerMentionTags />
      <PostContainerTrendTags />
    </Box>
  )
}
