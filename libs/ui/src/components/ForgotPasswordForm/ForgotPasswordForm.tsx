import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { toastMessage } from '@wsvvrijheid/utils'

import { ForgotPasswordFieldValues } from './types'
import { FormItem } from '../FormItem'

const schema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .email(t('contact.form.email-invalid') as string)
      .required(t('login.email.required') as string),
  })

export const ForgotPasswordForm = () => {
  const { t } = useTranslation()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFieldValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const { mutate, isLoading } = useMutation(
    ['forgot-password'],
    (values: ForgotPasswordFieldValues) =>
      axios.post('/api/auth/forgot-password', values),
    {
      onSuccess: () => {
        toastMessage(null, t`login.forgot-pass-header.text`, 'success')
        reset()
      },
      onError: () => {
        toastMessage(t`error`, t`apply-form.error.description`, 'error')
      },
    },
  )

  const onSubmit: SubmitHandler<ForgotPasswordFieldValues> = data => {
    mutate(data)
  }

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack
        spacing="8"
        shadow="base"
        bg="white"
        p={{ base: 8, lg: 12 }}
        rounded="lg"
      >
        <Stack spacing="6">
          <Stack spacing={{ base: '', md: '3' }} textAlign="center">
            <Heading>{t('login.forgot-pass-header.title')}</Heading>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <FormItem
              id="email"
              label={t('login.email.title') as string}
              type="email"
              register={register}
              errors={errors}
              name="email"
            />
          </Stack>
          <Stack spacing="6">
            <Button type="submit" isLoading={isLoading}>
              {t('login.forgot-pass-header.button')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
