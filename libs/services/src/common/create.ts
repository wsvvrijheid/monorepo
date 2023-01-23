import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  StrapiCreateInput,
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

export const createModel = <T extends StrapiModel, D extends StrapiCreateInput>(
  url: StrapiUrl,
  args: D,
  token?: string,
) => {
  return Mutation.post<T, D>(url, args, token)
}

export const useCreateModelMutation = <
  T extends StrapiModel,
  D extends StrapiCreateInput,
>(
  url: StrapiUrl,
) => {
  const toast = useToast()
  const { token } = useAuthSelector()

  return useMutation({
    mutationKey: ['update-model', url],
    mutationFn: (args: D) =>
      createModel<T, D>(url, args as D, token ?? undefined),
    onSuccess: res => {
      toast({
        title: `Model created`,
        description: `Model ${
          (res as StrapiTranslatableModel)?.title
        } has been created`,
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
