import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

export const approveModel = <T extends StrapiModel>(
  id: number,
  url: StrapiUrl,
) => {
  const body = {
    approvalStatus: 'approved',
    publishedAt: new Date().toISOString(),
  }

  return Mutation.put<T, typeof body>(url, id, body)
}

export const useApproveModel = <T extends StrapiTranslatableModel>(
  url: StrapiUrl,
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationKey: [`approve-${url}`],
    mutationFn: ({ id }: { id: number }) => approveModel<T>(id, url),
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: res => {
      // TODO Add translations
      queryClient.invalidateQueries(queryKey)
      toast({
        title: `Model ${res.approvalStatus}`,
        description: `Model has been ${res.approvalStatus}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
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
