import * as React from 'react'

import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { ResetPasswordFieldValues, ResetPasswordFormProps } from './types'

const schema = (t: TFunction) =>
  yup.object({
    password: yup
      .string()
      .min(8, t('login.password.warning'))
      .required(t('login.password.required'))
      .matches(RegExp('(.*[a-z].*)'), t('login.password.matches.lowercase'))
      .matches(RegExp('(.*[A-Z].*)'), t('login.password.matches.uppercase'))
      .matches(RegExp('(.*\\d.*)'), t('login.password.matches.number'))
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        t('login.password.matches.special'),
      ),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        t('login.password.matches.password-match'),
      ),
  })

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmitHandler,
  isLoading,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFieldValues>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })
  const onSubmit: SubmitHandler<ResetPasswordFieldValues> = data => {
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
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading>{t('login.reset-pass-header.title')}</Heading>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <FormItem
              id="password"
              type="password"
              label={t('login.password.title')}
              autoComplete="current-password"
              register={register}
              errors={errors}
              name="password"
            />
            <FormItem
              id="passwordConfirmation"
              type="password"
              label={t('login.password.password-confirm')}
              autoComplete="current-password"
              register={register}
              errors={errors}
              name="passwordConfirmation"
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
