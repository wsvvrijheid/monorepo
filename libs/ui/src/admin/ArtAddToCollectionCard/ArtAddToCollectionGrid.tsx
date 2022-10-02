import { useState } from 'react'

import { SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'
import { useUpdateArtMutation } from '@wsvvrijheid/utils'

import { WConfirm, WConfirmProps } from '../../components'
import { ArtAddToCollectionCard } from './ArtAddToCollectionCard'
import { ArtAddToCollectionGridProps } from './types'

export const ArtAddToCollectionGrid = ({
  arts,
  collection,
}: ArtAddToCollectionGridProps) => {
  const [artToBeMutated, setArtToBeMutated] = useState<Art | null>(null)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [confirmProps, setConfirmProps] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()

  const updateArtMutation = useUpdateArtMutation()

  const handleAdd = (art: Art) => {
    setArtToBeMutated(art)
    updateArtMutation.mutate({
      id: art.id,
      collection: collection.id,
    })
  }

  const handleRemove = (art: Art) => {
    setArtToBeMutated(art)
    onOpen()

    setConfirmProps({
      title: 'Remove art',
      description: 'Are you sure you want to remove this art?',
      buttonText: 'Remove',
      isWarning: true,
      onConfirm: async () => {
        await updateArtMutation.mutateAsync({
          id: art.id,
          collection: null,
        })

        setConfirmProps(undefined)
        onClose()
      },
    })
  }

  return (
    <>
      {confirmProps && (
        <WConfirm isOpen={isOpen} onClose={onClose} {...confirmProps} />
      )}
      <SimpleGrid gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
        {arts.map(art => {
          const isAdded = art.collection?.id === collection.id

          const isLoading =
            artToBeMutated?.id === art.id && updateArtMutation.isLoading

          return (
            <ArtAddToCollectionCard
              isAdded={isAdded}
              isLoading={isLoading}
              key={art.id}
              art={art}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )
        })}
      </SimpleGrid>
    </>
  )
}
