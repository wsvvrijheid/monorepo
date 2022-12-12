import { FC, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { checkAuth, useAppDispatch } from '@wsvvrijheid/store'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { TFunction } from 'next-i18next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import {
  SocialLoginButtons,
  SocialLoginButtonsProps,
} from '../SocialLoginButtons'
import { LoginFormFieldValues } from './types'

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
  const [errorMessage, setErrorMessage] = useState('')

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
      if (data.data?.error) {
        return setErrorMessage(data.data.error.message)
      }
      await dispatch(checkAuth()).unwrap()
      reset()
      router.push('/')
    },
    onError: (error: any) => {
      if (error?.response?.data?.error?.message) {
        setErrorMessage(error?.response?.data?.error?.message)
      } else {
        console.error('An unexpected error happened:', error)
        setErrorMessage('An unexpected error happened')
      }
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
          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading>{t('login.sign-in-header.title')}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.sign-in-header.text')}</Text>

              <Button
                as={Navigate}
                href="/register"
                variant="link"
                colorScheme="blue"
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
              colorScheme="blue"
              size="sm"
            >
              {t('login.password.forgot-password')}
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button
              type="submit"
              colorScheme="blue"
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
