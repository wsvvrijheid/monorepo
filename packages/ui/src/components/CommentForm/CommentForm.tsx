import { useEffect } from 'react'

import {
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'
import * as yup from 'yup'

import { useAuthContext } from '@wsvvrijheid/context'

import { CommentFormFieldValues, CommentFormProps } from './types'
import { FormItem } from '../FormItem'
import { WAvatar } from '../WAvatar'

const userSchema = yup.object({
  content: yup.string().required(),
})

const publicSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  content: yup.string().required(),
})

export const CommentForm: React.FC<CommentFormProps> = ({
  onSendForm,
  isLoading,
  isSuccess,
}) => {
  const { t } = useTranslation()
  const { user, profile, isLoggedIn } = useAuthContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentFormFieldValues>({
    resolver: yupResolver(isLoggedIn ? userSchema : publicSchema),
    mode: 'all',
  })

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  return (
    <Stack spacing={4} p={4} boxShadow="base" borderRadius="sm" bg="white">
      <Text
        textAlign="left"
        fontSize="16px"
        fontWeight={600}
        textTransform="capitalize"
      >
        {t('comments')}
      </Text>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSendForm)}
        alignItems="flex-start"
        justify="flex-start"
      >
        <Stack w="100%" alignItems="flex-start">
          {!isLoggedIn && (
            <Stack direction={{ base: 'column', lg: 'row' }} w="full">
              <FormItem
                name="name"
                hideLabel
                register={register}
                errors={errors}
              />
              <FormItem
                name="email"
                type="email"
                hideLabel
                register={register}
                errors={errors}
              />
            </Stack>
          )}
          <HStack w="full" align="start">
            {isLoggedIn && (
              <WAvatar
                size="sm"
                src={`${profile?.avatar}`}
                name={user?.username}
              />
            )}
            <FormItem
              as={Textarea}
              name="content"
              hideLabel
              register={register}
              errors={errors}
              {...useBreakpointValue({ base: { rows: 1 }, sm: { rows: 3 } })}
            />
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              aria-label="Send Comment"
              icon={<FiArrowRight />}
              isRound
              isLoading={isLoading}
              isDisabled={!isValid}
              type="submit"
            />
          </HStack>
        </Stack>
        <Button
          display={{ base: 'none', sm: 'flex' }}
          alignSelf="flex-end"
          rightIcon={<FiArrowRight />}
          isLoading={isLoading}
          isDisabled={!isValid}
          type="submit"
        >
          {t('comment-form.send')}
        </Button>
      </VStack>
    </Stack>
  )
}
