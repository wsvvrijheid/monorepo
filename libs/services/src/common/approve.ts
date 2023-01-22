import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { createLocalizations } from '../createLocalizations'

export const approveModel = <T extends StrapiModel>(
  id: number,
  url: StrapiUrl,
  token?: string,
) => {
  return Mutation.put<T, any>(`${url}/approve` as StrapiUrl, id, {}, token)
}

export const useApproveModel = <T extends StrapiModel>(
  url: StrapiUrl,
  translatedFields?: (keyof T)[],
  queryKey?: QueryKey,
) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { token } = useAuthSelector()

  return useMutation({
    mutationKey: [`approve-${url}`],
    mutationFn: ({ id }: { id: number }) =>
      approveModel<T>(id, url, token ?? undefined),
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    onSuccess: async res => {
      const translatableRes = res as StrapiTranslatableModel

      if (translatedFields && translatableRes.localizations?.length === 0) {
        await createLocalizations({
          data: res as StrapiTranslatableModel,
          translatedFields:
            translatedFields as (keyof StrapiTranslatableModel)[],
          url,
        })
      }

      toast({
        title: `Model ${translatableRes.approvalStatus}`,
        description: `Model has been ${translatableRes.approvalStatus}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      queryClient.invalidateQueries(queryKey)
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
