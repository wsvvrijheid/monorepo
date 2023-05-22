import { Stack } from '@chakra-ui/react'

import { PostMakerTweetButtons } from './PostMakerTweetButtons'
import { PostMakerTweetContent } from './PostMakerTweetContent'
import { PostMakerTweetTags } from './PostMakerTweetTags'
import { PostImage } from '../../components'

export const PostMakerTweetCard = () => {
  return (
    <Stack p={4} bg={'white'} spacing={4} _hover={{ bg: 'primary.50' }}>
      <PostMakerTweetContent />
      <PostMakerTweetTags />
      <PostImage rounded="lg" borderWidth={1} overflow={'hidden'} />
      <PostMakerTweetButtons />
    </Stack>
  )
}
