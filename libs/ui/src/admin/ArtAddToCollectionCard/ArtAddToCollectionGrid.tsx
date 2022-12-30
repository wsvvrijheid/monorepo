import { useState } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { useUpdateArtMutation } from '@wsvvrijheid/services'
import { Art } from '@wsvvrijheid/types'

import { WConfirm, WConfirmProps } from '../../components'
import { ArtAddToCollectionCard } from './ArtAddToCollectionCard'
import { ArtAddToCollectionGridProps } from './types'

export const ArtAddToCollectionGrid = ({
  arts,
  collection,
}: ArtAddToCollectionGridProps) => {
  const [artToBeMutated, setArtToBeMutated] = useState<Art | null>(null)

  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateArtMutation = useUpdateArtMutation()
  const queryClient = new QueryClient()

  const handleAdd = (art: Art) => {
    setArtToBeMutated(art)
    updateArtMutation.mutate({
      id: art.id,
      collection: collection.id,
    })
  }

  const handleRemove = (art: Art) => {
    setArtToBeMutated(art)

    setConfirmState({
      title: 'Remove art',
      description: 'Are you sure you want to remove this art?',
      buttonText: 'Remove',
      isWarning: true,
      onConfirm: async () => {
        updateArtMutation.mutate(
          {
            id: art.id,
            collection: null,
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(['collection', collection.id])
              setConfirmState(undefined)
            },
          },
        )
      },
    })
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
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
