import React, { FC, memo } from 'react'

import { Box, Center } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import { WImage } from '../../../../components'

interface CapsItemProps {
  image: string
  id: number
  isShared: boolean
  onCapsClick: (id: number) => void
}

export const CapsItem: FC<CapsItemProps> = memo(function CapsItem({
  image,
  id,
  isShared,
  onCapsClick,
}) {
  return (
    <Box
      rounded="md"
      shadow="primary"
      overflow="hidden"
      flexShrink={0}
      position="relative"
      onClick={() => onCapsClick(id)}
      cursor="pointer"
    >
      <WImage w={150} h={85} src={image} alt="image" />
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
