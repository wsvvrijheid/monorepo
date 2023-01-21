import { FC } from 'react'

import { Avatar, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { UploadFile } from '@wsvvrijheid/types'

import { Navigate } from '../Navigate'
import { WImage } from '../WImage'

interface CardProps {
  title: string
  description: string
  image: UploadFile
  link: string
  rounded?: boolean
}

export const Card: FC<CardProps> = ({
  title,
  description,
  image,
  link,
  rounded,
}) => {
  return (
    <Navigate href={link || '#'}>
      <Stack
        h="full"
        bg="white"
        shadow="base"
        rounded="lg"
        overflow="hidden"
        role="group"
      >
        <Center overflow="hidden">
          {/* TODO Create shared image component */}
          {rounded ? (
            <Avatar
              objectFit="cover"
              boxSize={48}
              src={`${API_URL}${image}`}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          ) : (
            <WImage
              src={image}
              alt={title}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          )}
        </Center>

        <Stack spacing={4} flex={1} p={4} align="center" textAlign="center">
          <Heading
            as="h3"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            color="primary.500"
          >
            {title}
          </Heading>
          <Text fontSize="md" lineHeight="base" noOfLines={3}>
            {description}
          </Text>
        </Stack>
      </Stack>
    </Navigate>
  )
}
