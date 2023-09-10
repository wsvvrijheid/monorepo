import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import {
  StrapiEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'

import { createLocalizations } from '../createLocalizations'

export const approveModel = async <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token?: string,
) => {
  return Mutation.put<T, any>(
    `${endpoint}/approve` as StrapiEndpoint,
    id,
    {},
    token as string,
  )
}

export const useApproveModel = <T extends StrapiTranslatableModel>(
  endpoint: StrapiEndpoint,
  translatedFields?: (keyof T)[],
) => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`approve-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      approveModel<T>(id, endpoint, token ?? undefined),
    onSuccess: async model => {
      const hasLocalizations = !!model?.localizations?.[0]

      if (model && translatedFields && !hasLocalizations) {
        const localizations = await createLocalizations({
          model,
          translatedFields:
            translatedFields as (keyof StrapiTranslatableModel)[],
          endpoint,
          token: token as string,
          hasSlug: endpoint !== 'posts',
        })

        // Fixes translated relation fields
        const promises = localizations?.map(
          localizedModel =>
            localizedModel &&
            Mutation.put(
              `${endpoint}/relation` as StrapiEndpoint,
              localizedModel.id,
              {},
              token as string,
            ),
        )

        if (promises) {
          await Promise.all(promises)
        }
      }

      toast({
        title: `Model ${model?.approvalStatus}`,
        description: `Model has been ${model?.approvalStatus}`,
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
