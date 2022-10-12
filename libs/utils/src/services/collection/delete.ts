import { useToast } from '@chakra-ui/react'
import { useMutation, QueryKey } from '@tanstack/react-query'
import { Collection } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Mutation } from '../../lib'

export const deleteCollection = ({ id }: { id: number }) => {
  return Mutation.delete<Collection>('api/collections', id)
}

export const useDeleteCollection = (queryKey?: QueryKey) => {
  const toast = useToast()
  const router = useRouter()

  return useMutation({
    mutationKey: ['delete-collection'],
    mutationFn: deleteCollection,
    onSuccess: () => {
      // TODO Add translations
      toast({
        title: 'Collection deleted',
        description: 'Collection has been deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      router.push(`/collections`)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
