import { FC } from 'react'

import { Avatar, Center, Heading, Stack, Text } from '@chakra-ui/react'

import { Navigate } from '../Navigate'
import { WImage } from '../WImage'

interface CardProps {
  title: string
  description: string
  image: string
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
    <Navigate href={link}>
      <Stack
        h="full"
        bg="white"
        shadow="lg"
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
              src={image}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          ) : (
            <WImage
              h={48}
              w="full"
              src={image}
              alt="project image"
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          )}
        </Center>

        <Stack
          spacing={4}
          flex={1}
          p={{ base: 4, lg: 8 }}
          align="center"
          textAlign="center"
        >
          <Heading
            as="h3"
            fontWeight={900}
            textTransform="uppercase"
            fontSize="xl"
            letterSpacing="wide"
            color="blue.500"
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
