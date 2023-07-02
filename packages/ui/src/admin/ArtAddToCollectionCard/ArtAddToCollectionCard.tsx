import { FC } from 'react'

import {
  Button,
  HStack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'
import { HiPlus } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'

import { UploadFile } from '@wsvvrijheid/types'

import { ArtAddToCollectionCardProps } from './types'
import { ArtModal, WImage } from '../../components'
import { useHasPermission } from '../../hooks'

export const ArtAddToCollectionCard: FC<ArtAddToCollectionCardProps> = ({
  isAdded,
  isLoading,
  art,
  onAdd,
  onRemove,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const titleKey = `title_${router.locale}` as const

  const { getPermission } = useHasPermission()

  return (
    <Stack boxShadow="md" rounded="md" direction={'column'} overflow="hidden">
      <WImage h={'200px'} src={art.image as UploadFile} />
      <Stack w="full" px={4} py={2}>
        <Text fontSize="md" fontWeight={600} noOfLines={1}>
          {art[titleKey]}
        </Text>

        <Text fontSize="sm" noOfLines={2}>
          {art.artist?.username}
        </Text>

        <HStack justify="space-between" w="full">
          <Button
            leftIcon={<AiOutlineEye />}
            title="View"
            onClick={onOpen}
            variant={'ghost'}
            colorScheme={'gray'}
            size="xs"
          >
            View
          </Button>

          <Spacer />

          {getPermission(['arteditor']) && (
            <Button
              variant={'outline'}
              colorScheme={isAdded ? 'red' : 'green'}
              leftIcon={isAdded ? <IoCloseSharp /> : <HiPlus />}
              size="xs"
              isLoading={isLoading}
              onClick={() => {
                isAdded ? onRemove(art) : onAdd(art)
              }}
            >
              {isAdded ? 'Remove' : 'Add to Collection'}
            </Button>
          )}
        </HStack>
      </Stack>
      <ArtModal art={art} isOpen={isOpen} onClose={onClose} />
    </Stack>
  )
}
