import { FC, useEffect, useState } from 'react'

import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import { API_URL } from '@wsvvrijheid/config'
import {
  useDeleteModel,
  usePublishModel,
  useUnpublishModel,
} from '@wsvvrijheid/services'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { ArtCardActions } from './ArtCardActions'
import { ArtCardAlertDialog } from './ArtCardAlertDialog'
import { ArtCardImage } from './ArtCardImage'
import { ArtActionType, ArtCardBaseProps } from './types'
import { Navigate } from '../Navigate'

export const ArtCardBase: FC<ArtCardBaseProps> = ({
  art,
  isMasonry,
  toggleLike,
  isLiked,
  actions,
  isOwner,
  actionQueryKey,
}) => {
  const queryKey = actionQueryKey as QueryKey

  const [actionType, setActionType] = useState<ArtActionType>()
  const [hover, setHover] = useState({ color: 'gray.100' })
  const [color, setColor] = useState('white')

  const router = useRouter()

  const deleteMutation = useDeleteModel('api/arts', queryKey)
  const publishMutation = usePublishModel('api/arts', queryKey)
  const unpublishMutation = useUnpublishModel('api/arts', queryKey)

  useEffect(() => {
    setHover({ color: isLiked ? 'red.200' : 'gray.100' })
    setColor(isLiked ? 'red.400' : 'white')
  }, [isLiked])

  const onClickLink = () => {
    router.push(`/club/arts/${art.slug}`)
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const noOfLines = useBreakpointValue({ base: undefined, lg: 2 })

  const artistName = art.artist?.name
  const artistUsername = art.artist?.username
  const artistAvatar =
    art.artist?.avatar?.formats?.thumbnail?.url || art.artist?.avatar?.url

  const onHandleAction = (type: ArtActionType) => {
    switch (type) {
      case 'delete':
        deleteMutation.mutate({ id: art.id })
        break
      case 'publish':
        publishMutation.mutate({ id: art.id })
        break
      case 'unpublish':
        unpublishMutation.mutate({ id: art.id })
        break
      default:
        setActionType(type)
        onOpen()
    }
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
            <Text fontWeight="semibold" color="white">
              {(art?.likes || 0) + (art.likers?.length || 0)}
            </Text>
            <IconButton
              _hover={hover}
              aria-label="like post"
              borderColor="whiteAlpha.500"
              borderWidth={1}
              color={color}
              colorScheme="blackAlpha"
              disabled={isOwner}
              icon={<AiFillHeart />}
              onClick={toggleLike}
              rounded="full"
            />
          </HStack>

          <IconButton
            onClick={onClickLink}
            _hover={{ bg: 'blue.400' }}
            aria-label="view art"
            borderColor="whiteAlpha.500"
            borderWidth={1}
            color="white"
            colorScheme="blackAlpha"
            icon={<FaExternalLinkSquareAlt />}
            rounded="full"
          />

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
            fontWeight="semibold"
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
            <Navigate href={`/club/artist/${art.artist?.id}`}>
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
