import { useEffect } from 'react'

import {
  Avatar,
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
import { useAuthSelector } from '@wsvvrijheid/store'
import { useTranslation } from 'next-i18next'
import { TFunction } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { CommentFormFieldValues, CommentFormProps } from './types'

const userSchema = (t: TFunction) =>
  yup.object({
    content: yup
      .string()
      .required(t('comment-form.content.required') as string),
  })

const publicSchema = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t('comment-form.name.required') as string),
    email: yup
      .string()
      .email(t('comment-form.email.invalid') as string)
      .required(t('comment-form.email.required') as string),
    content: yup
      .string()
      .required(t('comment-form.content.required') as string),
  })

export const CommentForm: React.FC<CommentFormProps> = ({
  onSendForm,
  isLoading,
  isSuccess,
}) => {
  const { t } = useTranslation()
  const { user, isLoggedIn } = useAuthSelector()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentFormFieldValues>({
    resolver: yupResolver(isLoggedIn ? userSchema(t) : publicSchema(t)),
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
        fontWeight="semibold"
        textTransform="capitalize"
      >
        {t('apply-form.comment-placeholder')}
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
                label={t('comment-form.name.placeholder') as string}
                register={register}
                errors={errors}
              />
              <FormItem
                name="email"
                type="email"
                hideLabel
                label={t('comment-form.email.placeholder') as string}
                register={register}
                errors={errors}
              />
            </Stack>
          )}
          <HStack w="full" align="start">
            {isLoggedIn && (
              <Avatar size="sm" src={`${user?.avatar}`} name={user?.username} />
            )}
            <FormItem
              as={Textarea}
              name="content"
              hideLabel
              label={t('comment-form.content.placeholder') as string}
              register={register}
              errors={errors}
              {...useBreakpointValue({ base: { rows: 1 }, sm: { rows: 3 } })}
            />
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              colorScheme="blue"
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
          colorScheme="blue"
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
