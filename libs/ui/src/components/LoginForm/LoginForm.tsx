/* eslint-disable import/order */
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  InputProps,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useState } from 'react'
import {
  FieldErrors,
  FieldValues,
  useForm,
  SubmitHandler,
  UseFormRegister,
} from 'react-hook-form'
import * as yup from 'yup'

import { OAuthButtonGroup } from '../oauth-button-group'

import { Navigate } from '~components'
import { useAuth } from '~hooks'
import { FormItem } from '../FormItem'
import { TFunction } from 'react-i18next'

const schema = (t: TFunction<'translation', undefined>) =>
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
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export type LoginFormProps = InputProps & {
  name: string
  label?: string
  placeholder?: string
  helperText?: string
  leftElement?: React.ReactNode
  hideLabel?: boolean
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
  onSubmitHandler: (data: FieldValues) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitHandler }) => {
  useAuth('/profile', true)

  const [errorMessage, setErrorMessage] = useState(null)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const handleSubmitSign: SubmitHandler<FieldValues> = async data => {
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
            <Heading>{t('login.sign-in-header.title')}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.sign-in-header.text')}</Text>
              <Navigate
                variant="link"
                as={Button}
                href="/user/register"
                colorScheme="blue"
              >
                {t('login.sign-in-header.button')}
              </Navigate>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(handleSubmitSign)}>
          <Stack spacing="5">
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            <FormItem
              id="email"
              label={t('login.email.title')}
              type="email"
              register={register}
              errors={errors}
            />
            <FormItem
              id="password"
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
              href="/user/forgot-password"
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
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                {t('login.sign-in-with')}
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
