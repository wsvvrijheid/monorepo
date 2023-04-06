import { FC } from 'react'

import {
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { checkAuth, useAppDispatch } from '@wsvvrijheid/store'

import { LoginFormFieldValues } from './types'
import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import {
  SocialLoginButtons,
  SocialLoginButtonsProps,
} from '../SocialLoginButtons'

const schema = (t: TFunction) =>
  yup.object({
    password: yup.string().required(t('login.password.required') as string),
    email: yup
      .string()
      .email(t('contact.form.email-invalid') as string)
      .required(t('login.email.required') as string),
  })

type LoginFormProps = Pick<SocialLoginButtonsProps, 'providersToBeShown'>

export const LoginForm: FC<LoginFormProps> = ({ providersToBeShown = [] }) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const dispatch = useAppDispatch()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      axios.post('/api/auth/login', {
        identifier: body.email,
        password: body.password,
      }),
    onSuccess: async data => {
      await dispatch(checkAuth()).unwrap()
      reset()
      router.push('/')
    },
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data)
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
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading>{t('login.sign-in-header.title')}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.sign-in-header.text')}</Text>

              <Button
                as={Navigate}
                href="/register"
                variant="link"
                colorScheme="primary"
              >
                {t('login.sign-in-header.button')}
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(handleSubmitSign)}>
          <Stack spacing="5">
            <FormItem
              data-testid="input-email"
              name="email"
              label={t('login.email.title') as string}
              type="email"
              register={register}
              errors={errors}
            />
            <FormItem
              data-testid="input-password"
              name="password"
              type="password"
              label={t('login.password.title') as string}
              autoComplete="current-password"
              register={register}
              errors={errors}
            />
          </Stack>
          <HStack justify="space-between">
            {/* TODO Set session exp time */}
            <Checkbox defaultChecked>{t('login.remember-me')}</Checkbox>

            <Button
              data-testid="button-forgot-password"
              as={Navigate}
              href="/forgot-password"
              variant="link"
              colorScheme="primary"
              size="sm"
            >
              {t('login.password.forgot-password')}
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button
              type="submit"
              colorScheme="primary"
              data-testid="button-submit-login"
            >
              {t('login.sign-in')}
            </Button>
            {loginMutation.isError && (
              <Text color="red.500" fontSize="sm">
                {(loginMutation.error as any)?.response?.data?.message ||
                  'An error occured'}
              </Text>
            )}
            {providersToBeShown.length > 0 && (
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  {t('login.sign-in-with')}
                </Text>
                <Divider />
              </HStack>
            )}
            <SocialLoginButtons providersToBeShown={providersToBeShown} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
