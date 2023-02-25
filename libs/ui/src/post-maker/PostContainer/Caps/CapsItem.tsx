import { FC, memo } from 'react'

import { Box, Center } from '@chakra-ui/react'
import { Post } from '@wsvvrijheid/types'
import { FaCheck } from 'react-icons/fa'

import { PostImage } from '../../../components'

interface CapsItemProps {
  post: Post
  id: number
  isShared: boolean
  onCapsClick: (id: number) => void
}

export const CapsItem: FC<CapsItemProps> = memo(function CapsItem({
  post,
  id,
  isShared,
  onCapsClick,
}) {
  return (
    <Box
      rounded="md"
      shadow="base"
      overflow="hidden"
      flexShrink={0}
      position="relative"
      onClick={() => onCapsClick(id)}
      cursor="pointer"
    >
      <PostImage w={150} h={85} post={post} />
      {isShared && (
        <Center pos="absolute" top={0} left={0} boxSize="full">
          <Box pos="relative" color="white" fontSize="2xl" as={FaCheck} />
          <Box
            pos="absolute"
            top={0}
            left={0}
            boxSize="full"
            bg="gray.500"
            blendMode="multiply"
          />
        </Center>
      )}
    </Box>
  )
})
