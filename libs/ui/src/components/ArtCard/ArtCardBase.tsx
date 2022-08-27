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
import { API_URL } from '@wsvvrijheid/config'
import { AiFillHeart } from 'react-icons/ai'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { Navigate } from '../Navigate'
import { ArtCardActions } from './ArtCardActions'
import { ArtCardAlertDialog } from './ArtCardAlertDialog'
import { ArtCardImage } from './ArtCardImage'
import { ArtActionType, ArtCardProps } from './types'

export const ArtCardBase: FC<ArtCardProps> = ({
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
      {actions && actionType && (
        <ArtCardAlertDialog
          title={actions[actionType].title}
          text={actions[actionType].text}
          onClose={onClose}
          onClick={actions[actionType].onClick}
          isOpen={isOpen}
          colorScheme={actions[actionType].colorScheme}
          buttonText={actions[actionType].buttonText}
        />
      )}

      <Box
        w="full"
        userSelect="none"
        role="group"
        pos="relative"
        overflow="hidden"
      >
        {/* Card Image */}
        <ArtCardImage art={art} isMasonry={isMasonry} />

        {!art.publishedAt && (
          <Badge left={2} pos="absolute" top={2} userSelect="none">
            Draft
          </Badge>
        )}

        {/* Card Body */}
        <Box
          _groupHover={{ left: 0 }}
          bgGradient="linear(to-t, blackAlpha.700, transparent, transparent, blackAlpha.700)"
          bottom={0}
          display={{ base: 'none', lg: 'block' }}
          h="full"
          left="-150%"
          position={{ base: 'static', lg: 'absolute' }}
          transition="all 0.2s ease-in-out"
          w="full"
        />

        <HStack
          _groupHover={{ top: 2, right: 2 }}
          justify="end"
          position="absolute"
          right={{ base: 2, lg: '-150%' }}
          top={{ base: 2, lg: '-150%' }}
          transition="all 0.2s"
          w="full"
        >
          <HStack spacing={1}>
            <Text fontWeight={600} color="white">
              {(art?.likes || 0) + (art.likers?.length || 0)}
            </Text>
            <IconButton
              _hover={{ color: isLiked ? 'red.200' : 'gray.100' }}
              aria-label="like post"
              borderColor="whiteAlpha.500"
              borderWidth={1}
              color={isLiked ? 'red.400' : 'white'}
              colorScheme="blackAlpha"
              disabled={isOwner}
              icon={<AiFillHeart />}
              onClick={toggleLike}
              rounded="full"
            />
          </HStack>
          <Navigate href={`/club/art/${art.slug}`}>
            <IconButton
              _hover={{ bg: 'blue.400' }}
              aria-label="view art"
              borderColor="whiteAlpha.500"
              borderWidth={1}
              color="white"
              colorScheme="blackAlpha"
              icon={<FaExternalLinkSquareAlt />}
              rounded="full"
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
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          bottom={0}
          p={{ base: 2, lg: 0 }}
          pos={{ base: 'absolute', lg: 'static' }}
          pt={{ base: 12, lg: 0 }}
          w="full"
        >
          <Stack
            _groupHover={{ bottom: 2 }}
            bottom={'-150%'}
            color="white"
            fontSize={{ base: 'md', lg: 'sm' }}
            fontWeight={600}
            position={{ base: 'static', lg: 'absolute' }}
            spacing={0}
            transition="all 0.2s"
            w="full"
          >
            <Text
              display={{ base: 'none', lg: 'block' }}
              noOfLines={noOfLines}
              p={2}
              pb={0}
            >
              {art.title}
            </Text>
            <Navigate href={`/club/artist/${artistUsername}`}>
              <HStack
                _hover={{ bg: 'whiteAlpha.300', borderColor: 'whiteAlpha.500' }}
                borderColor="transparent"
                borderWidth={1}
                m={1}
                p={1}
                rounded="lg"
                w="max-content"
              >
                <Avatar
                  size="xs"
                  name={artistName || artistUsername}
                  src={`${API_URL}${artistAvatar}`}
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
