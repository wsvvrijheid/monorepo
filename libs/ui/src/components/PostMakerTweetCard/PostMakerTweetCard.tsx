import { Stack } from '@chakra-ui/react'

import { useHashtagContext } from '@wsvvrijheid/context'

import { PostMakerTweetButtons } from './PostMakerTweetButtons'
import { PostMakerTweetContent } from './PostMakerTweetContent'
import { PostMakerTweetTags } from './PostMakerTweetTags'
import { PostImage } from '../PostImage'

export const PostMakerTweetCard = ({ id }: { id: number }) => {
  const { activePostId, setActivePostId } = useHashtagContext()

  const isActive = id === activePostId

  return (
    <Stack
      p={4}
      bg={'white'}
      spacing={4}
      onMouseEnter={() => setActivePostId(id)}
      {...(isActive && { bg: 'primary.50' })}
    >
      <PostMakerTweetContent id={id} />
      <PostMakerTweetTags id={id} />
      <PostImage rounded="lg" borderWidth={1} overflow={'hidden'} id={id} />
      <PostMakerTweetButtons id={id} />
    </Stack>
  )
}
