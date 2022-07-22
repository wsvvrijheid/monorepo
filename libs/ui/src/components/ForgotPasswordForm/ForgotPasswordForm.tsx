import * as React from 'react'

import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { ForgotPasswordFormProps, ForgotPasswordFieldValues } from './types'

const schema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmitHandler,
  isLoading,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFieldValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<ForgotPasswordFieldValues> = data => {
    onSubmitHandler(data)
  }

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack
        spacing="8"
        shadow="lg"
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
              label={t('login.email.title')}
              type="email"
              register={register}
              errors={errors}
              name="email"
            />
          </Stack>
          <Stack spacing="6">
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              {t('login.forgot-pass-header.button')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
