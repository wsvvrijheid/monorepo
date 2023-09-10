import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import { UserFeedback, UserFeedbackCreateInput } from '@wsvvrijheid/types'

export const createUserFeedback = async (
  userFeedback: UserFeedbackCreateInput,
  token: string,
) => {
  if (!userFeedback) {
    throw new Error('feedback field is required')
  }

  await Mutation.post<UserFeedback, UserFeedbackCreateInput>(
    'user-feedbacks',
    userFeedback,
    token,
  )
}

export const useUserFeedbackMutation = () => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['user-feedback'],
    mutationFn: (userFeedback: UserFeedbackCreateInput) => {
      return createUserFeedback(userFeedback, token as string)
    },
    onSuccess: () => {
      toast({
        title: `Feedback.`,
        description: `We recieved your feedback. Thank you for your opinion.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: error => {
      console.error(error)
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
