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
import { setAuth, useAppDispatch } from '@wsvvrijheid/utils'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TFunction } from 'react-i18next'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import { OAuthButtonGroup } from '../OAuthButtonGroup'
import { LoginFormFieldValues } from './types'

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
        RegExp('[!@#$%^&*(),.?":{}|<>_+-=]'),
        t('login.password.matches.special'),
      ),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export const LoginForm = () => {
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
    onSuccess: data => {
      dispatch(setAuth(data.data))
      reset()
      router.push('/')
    },
    onError: e => {
      console.log('e', e)
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
              <Navigate
                variant="link"
                as={Button}
                href="/register"
                colorScheme="blue"
              >
                {t('login.sign-in-header.button')}
              </Navigate>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(handleSubmitSign)}>
          <Stack spacing="5">
            <FormItem
              name="email"
              label={t('login.email.title')}
              type="email"
              register={register}
              errors={errors}
            />
            <FormItem
              name="password"
              type="password"
              label={t('login.password.title')}
              autoComplete="current-password"
              register={register}
              errors={errors}
            />
          </Stack>
          <HStack justify="space-between">
            {/* TODO Set session exp time */}
            <Checkbox defaultChecked>{t('login.remember-me')}</Checkbox>
            <Navigate
              as={Button}
              href="/forgot-password"
              variant="link"
              colorScheme="blue"
              size="sm"
            >
              {t('login.password.forgot-password')}
            </Navigate>
          </HStack>
          <Stack spacing="6">
            <Button type="submit" colorScheme="blue">
              {t('login.sign-in')}
            </Button>
            {loginMutation.isError && (
              <Text color="red.500" fontSize="sm">
                {(loginMutation.error as any)?.response?.data?.message ||
                  'An error occured'}
              </Text>
            )}
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                {t('login.sign-in-with')}
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup isDisabled={false} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
