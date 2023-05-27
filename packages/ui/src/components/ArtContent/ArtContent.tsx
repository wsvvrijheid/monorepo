import { FC } from 'react'

import { Avatar, Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { Navigate } from '../Navigate'

interface ArtContentProps {
  title: string
  artistName: string
  artistAvatar?: string
  artistProfilePath: string
  description: string
}

export const ArtContent: FC<ArtContentProps> = ({
  title,
  artistName,
  artistAvatar,
  artistProfilePath,
  description,
}) => {
  return (
    <Stack p={4} spacing={4} borderRadius="sm" bg="white" boxShadow="base">
      <Heading as="h2" fontSize="3xl">
        {title}
      </Heading>
      <Navigate href={artistProfilePath}>
        <HStack>
          <Avatar size="sm" src={artistAvatar} name={artistName} />
          <Text fontWeight={600} lineHeight={6} fontSize="md">
            {artistName}
          </Text>
        </HStack>
      </Navigate>

      {/* TODO Does it supposed to be markdown?  */}
      <Text fontSize="md" lineHeight={6}>
        {description}
      </Text>
    </Stack>
  )
}
