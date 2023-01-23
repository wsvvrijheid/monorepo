import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Mutation } from '@wsvvrijheid/lib'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { createLocalizations } from '../createLocalizations'

export const approveModel = async <T extends StrapiModel>(
  id: number,
  url: StrapiUrl,
  token?: string,
) => {
  return Mutation.put<T, any>(`${url}/approve` as StrapiUrl, id, {}, token)
}

export const useApproveModel = <T extends StrapiModel>(
  url: StrapiUrl,
  translatedFields?: (keyof T)[],
) => {
  const toast = useToast()
  const { token } = useAuthSelector()

  return useMutation({
    mutationKey: [`approve-${url}`],
    mutationFn: ({ id }: { id: number }) =>
      approveModel<T>(id, url, token ?? undefined),
    onSuccess: async res => {
      const translatableRes = res as StrapiTranslatableModel
      const hasLocalizations = translatableRes?.localizations?.[0]

      if (translatedFields && !hasLocalizations) {
        await createLocalizations({
          data: res as StrapiTranslatableModel,
          translatedFields:
            translatedFields as (keyof StrapiTranslatableModel)[],
          url,
        })
      }

      toast({
        title: `Model ${translatableRes?.approvalStatus}`,
        description: `Model has been ${translatableRes?.approvalStatus}`,
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
