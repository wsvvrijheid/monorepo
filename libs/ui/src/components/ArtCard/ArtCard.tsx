import { FC, useState } from 'react'

import {
  Avatar,
  Badge,
  Box,
  HStack,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { Navigate } from '../Navigate'
import { ArtCardActions } from './/ArtCardActions'
import { ArtCardAlertDialog } from './ArtCardAlertDialog'
import { ArtCardImage } from './ArtCardImage'
import { ArtActionType, ArtCardProps } from './types'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  isMasonry,
  toggleLike,
  isLiked,
  actions,
  isOwner,
}) => {
  const [actionType, setActionType] = useState<ArtActionType>()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const noOfLines = useBreakpointValue({ base: undefined, lg: 2 })

  const artistName = art.artist?.name
  const artistUsername = art.artist?.user?.username
  const artistAvatar =
    art.artist?.user?.avatar?.formats?.thumbnail?.url ||
    art.artist?.user?.avatar?.url

  const onHandleAction = (type: ArtActionType) => {
    setActionType(type)
    onOpen()
  }

  return (
    <>
      {/* Card Action Alert Dialog */}
      {actionType && (
        <ArtCardAlertDialog
          buttonText={actions[actionType].buttonText}
          colorScheme={actions[actionType].colorScheme}
          isOpen={isOpen}
          text={actions[actionType].text}
          title={actions[actionType].title}
          onClick={actions[actionType].onClick}
          onClose={onClose}
        />
      )}

      <Box
        pos="relative"
        role="group"
        w="full"
        overflow="hidden"
        userSelect="none"
      >
        {/* Card Image */}
        <ArtCardImage art={art} isMasonry={isMasonry} />

        {!art.publishedAt && (
          <Badge userSelect="none" pos="absolute" top={2} left={2}>
            Draft
          </Badge>
        )}

        {/* Card Body */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position={{ base: 'static', lg: 'absolute' }}
          bottom={0}
          h="full"
          left="-150%"
          w="full"
          _groupHover={{ left: 0 }}
          transition="all 0.2s ease-in-out"
          bgGradient="linear(to-t, blackAlpha.700, transparent, transparent, blackAlpha.700)"
        />

        <HStack
          position="absolute"
          top={{ base: 2, lg: '-150%' }}
          right={{ base: 2, lg: '-150%' }}
          w="full"
          _groupHover={{ top: 2, right: 2 }}
          transition="all 0.2s"
          justify="end"
        >
          <HStack spacing={1}>
            <Text fontWeight={600} color="white">
              {(art?.likes || 0) + (art.likers?.length || 0)}
            </Text>
            <IconButton
              rounded="full"
              aria-label="like post"
              color={isLiked ? 'red.400' : 'white'}
              colorScheme="blackAlpha"
              borderColor="whiteAlpha.500"
              borderWidth={1}
              disabled={isOwner}
              icon={<AiFillHeart />}
              onClick={toggleLike}
              _hover={{ color: isLiked ? 'red.200' : 'gray.100' }}
            />
          </HStack>
          <Navigate href={`/club/art/${art.slug}`}>
            <IconButton
              rounded="full"
              aria-label="view art"
              color="white"
              colorScheme="blackAlpha"
              borderColor="whiteAlpha.500"
              borderWidth={1}
              icon={<FaExternalLinkSquareAlt />}
              _hover={{ bg: 'blue.400' }}
            />
          </Navigate>
          {/* Card Owner Actions */}
          {isOwner && (
            <ArtCardActions
              isPublished={!!art.publishedAt}
              onHandleAction={onHandleAction}
            />
          )}
        </HStack>

        <HStack
          align="center"
          pos={{ base: 'absolute', lg: 'static' }}
          bottom={0}
          w="full"
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          p={{ base: 2, lg: 0 }}
          pt={{ base: 12, lg: 0 }}
        >
          <Stack
            position={{ base: 'static', lg: 'absolute' }}
            bottom={'-150%'}
            w="full"
            _groupHover={{ bottom: 2 }}
            transition="all 0.2s"
            fontSize={{ base: 'md', lg: 'sm' }}
            color="white"
            spacing={0}
            fontWeight={600}
          >
            <Text
              p={2}
              pb={0}
              display={{ base: 'none', lg: 'block' }}
              noOfLines={noOfLines}
            >
              {art.title}
            </Text>
            <Navigate href={`/club/artist/${artistUsername}`}>
              <HStack
                m={1}
                p={1}
                rounded="lg"
                w="max-content"
                borderWidth={1}
                borderColor="transparent"
                _hover={{ bg: 'whiteAlpha.300', borderColor: 'whiteAlpha.500' }}
              >
                <Avatar
                  size="xs"
                  src={`${process.env['NX_API_URL']}${artistAvatar}`}
                  name={artistName || artistUsername}
                />
                <Text noOfLines={1}>{artistName || artistUsername}</Text>
              </HStack>
            </Navigate>
          </Stack>
        </HStack>
      </Box>
    </>
  )
}
