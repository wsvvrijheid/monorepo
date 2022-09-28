import { FC, useState } from 'react'

import { Box, Flex, Spacer, Stack, Text } from '@chakra-ui/react'

import {  ArtModal, WImage } from '../../components'
import { ArtAddToCollectionCardProps } from './types'
import { MutationButton } from '@wsvvrijheid/ui'
import { AiOutlineEye } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { HiPlus } from 'react-icons/hi'

export const ArtAddToCollectionCard: FC<ArtAddToCollectionCardProps> = ({
  isAdded,
  art,
  onAdd, onRemove
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [added, setAdded] = useState(isAdded)
  return (
    <Stack
      w={'300px'}
      boxShadow="md"
      rounded="md"
      align={'flex-start'}
      direction={'column'}
      overflow="hidden"
    >
      <WImage
        h={'200px'}
        src={
          art.images ? art.images[0].url : ''
        }
      />
      <Stack pl={2} flex={1} justify="space-between">
        <Text fontSize="md" fontWeight="semibold" noOfLines={1}>
          {art.title}
        </Text>

        <Text fontSize="sm" noOfLines={2}>
          {art.artist?.username}
        </Text>
      </Stack>
      <Flex gap={'2'} w='full'>
        <Box p='2'>
        <MutationButton
          icon={<AiOutlineEye />}
          title="View"
          onClick={() => setIsOpen(true)}
          variant={'ghost'}
          colorScheme={'gray'}
        />
        </Box>
        <Spacer />
        <Box p='2'>
        <MutationButton
          variant={'outline'}
          colorScheme={added ? 'red' : 'green'}
          icon={added ? <IoCloseSharp /> : <HiPlus />}
          title={added ? 'Remove' : 'Add to Collection'}
          onClick={() => {isAdded ? onRemove() : onAdd(); setAdded(prev => !prev)}}
        />
        </Box>
      </Flex>
      <ArtModal auth={{
        user: null,
        isLoggedIn: false,
        token: null
      }} art={art} isOpen={isOpen} onClose={() => setIsOpen(false) } />
    </Stack>
  )
}
