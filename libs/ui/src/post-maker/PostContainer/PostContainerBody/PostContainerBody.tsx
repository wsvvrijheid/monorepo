import { FC, memo } from 'react'

import { Box, Spacer, Stack } from '@chakra-ui/react'
import { Post } from '@wsvvrijheid/types'

import { PostImage } from '../../../components'
import { PostContainerTags } from '../PostContainerTags'
import { PostTextarea } from '../PostTextarea'

interface PostContainerBodyProp {
  post?: Post
}

export const PostContainerBody: FC<PostContainerBodyProp> = memo(({ post }) => {
  return (
    <Stack
      flex={1}
      data-tour="step-post-content"
      data-tour-mob="step-post-content"
      p={4}
      rounded="sm"
      borderWidth={1}
      fontSize="md"
      bg="white"
    >
      <PostTextarea />
      <PostContainerTags />
      <Spacer />

      {post?.imageParams && post?.image?.url && (
        <Box
          rounded="md"
          overflow="hidden"
          borderColor="gray.300"
          borderWidth={1}
        >
          <PostImage post={post} />
        </Box>
      )}
    </Stack>
  )
})
