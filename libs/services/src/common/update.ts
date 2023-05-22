import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUpdateInput,
  StrapiUrl,
} from '@wsvvrijheid/types'

export const updateModel = <
  T extends StrapiModel,
  D extends StrapiUpdateInput & { id: number },
>(
  url: StrapiUrl,
  id: number,
  args: D,
  token: string,
) => {
  return Mutation.put<T, StrapiUpdateInput>(url, id, args, token)
}

export const useUpdateModelMutation = <
  T extends StrapiModel,
  D extends StrapiUpdateInput & { id: number },
>(
  url: StrapiUrl,
) => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['update-model', url],
    mutationFn: ({ id, ...args }: D & { id: number }) =>
      updateModel<T, D>(url, id, args as D, token as string),
    onSuccess: res => {
      toast({
        title: `Model updated`,
        description: `Model ${
          (res as StrapiTranslatableModel).title
        } has been updated`,
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
