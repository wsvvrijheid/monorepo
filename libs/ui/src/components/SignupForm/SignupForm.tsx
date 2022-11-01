import * as React from 'react'

import {
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { TFunction } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import { OAuthButtonGroup } from '../OAuthButtonGroup'
import { SignupFormProps, SignupFormFieldValues } from './types'

const schema = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t('login.name.required')),
    username: yup.string().required(t`login.username.required`),
    password: yup
      .string()
      .min(8, t('login.password.warning', { count: 8 }))
      .required(t('login.password.required'))
      .matches(RegExp('(.*[a-z].*)'), t('login.password.matches.lowercase'))
      .matches(RegExp('(.*[A-Z].*)'), t('login.password.matches.uppercase'))
      .matches(RegExp('(.*\\d.*)'), t('login.password.matches.number')),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export const SignupForm: React.FC<SignupFormProps> = ({
  onSignup,
  onAcceptTerms,
  errorMessage,
  isTermsAccepted,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const handleSubmitSignUp: SubmitHandler<
    SignupFormFieldValues
  > = async data => {
    await onSignup(data)
  }
  return (
    <Container
      maxW="lg"
      py={{ base: '8', md: '16' }}
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
            <Heading>{t('login.sign-up-header.title')}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{t('login.sign-up-header.text')}</Text>
              <Navigate
                variant="link"
                as={Button}
                href="/login"
                colorScheme="blue"
              >
                {t('login.sign-up-header.button')}
              </Navigate>
            </HStack>
          </Stack>
        </Stack>
        <Stack
          spacing="6"
          as="form"
          onSubmit={handleSubmit(handleSubmitSignUp)}
        >
          <Stack spacing="5">
            {errorMessage && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <FormItem
              name="name"
              label={t('login.name.title')}
              register={register}
              errors={errors}
            />
            <FormItem
              name="username"
              label={t('login.username.title')}
              register={register}
              errors={errors}
            />
            <FormItem
              name="email"
              type="email"
              label={t('login.email.title')}
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

            <HStack>
              {/* TODO Set session exp time */}
              <Checkbox defaultChecked onChange={onAcceptTerms} />
              <Navigate
                as={Button}
                href="/terms"
                variant="link"
                colorScheme="gray"
                size="sm"
              >
                {t('login.terms-use')}
              </Navigate>
            </HStack>
          </Stack>
          <Stack spacing="6">
            <Button
              type="submit"
              colorScheme="blue"
              disabled={!isTermsAccepted}
            >
              {t('login.create-account')}
            </Button>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                {t('login.sign-up-with')}
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup isDisabled={!isTermsAccepted} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
