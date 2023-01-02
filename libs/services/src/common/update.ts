import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiMutationInput,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
  StrapiUrl,
} from '@wsvvrijheid/types'

export const updateModel = <
  T extends StrapiTranslatableModel,
  D extends StrapiTranslatableUpdateInput & { id: number },
>(
  url: StrapiUrl,
  { id, ...args }: D & { id: number },
) => {
  return Mutation.put<T, StrapiMutationInput>(url, id, args)
}

export const useUpdateModelMutation = <
  T extends StrapiTranslatableModel,
  D extends StrapiTranslatableUpdateInput & { id: number },
>(
  url: StrapiUrl,
) => {
  const toast = useToast()
  return useMutation({
    mutationKey: ['update-model', url],
    mutationFn: ({ id, ...args }: D) =>
      updateModel<T, D>(url, { id, ...args } as D),
    onSuccess: (res: T) => {
      toast({
        title: `Model updated`,
        description: `Model ${res.title} has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error('error in sercices', error)
      toast({
        title: 'Error',
        description: `Something went wrong`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
