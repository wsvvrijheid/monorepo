import React, { useState } from 'react'

import {
    Box,
  Button,
  Center,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation, Trans } from 'react-i18next'

import { useAuthContext } from '@wsvvrijheid/context'

import { FormItem, LoginFormFieldValues, Navigate } from '../../components'
import { adminLoginSchema } from '../AdminLoginForm/schema'

export const AuthModal = () => {
  // const { authModalDisclosure,isLoading } = useAuthContext()

  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormFieldValues>({
    resolver: yupResolver(adminLoginSchema(t)),
    mode: 'all',
  })

  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    isLoading: isAuthLoading,
    login,
    authModalDisclosure,
  } = useAuthContext()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data, {
      onError: e => console.log('Login error', e),
      onSuccess: async () => {
        setIsRedirecting(true)
        reset()
        await router.push('/')
        setIsRedirecting(false)
      },
    })
  }

  return (
    <Box bg='red'>
    <Modal
      // isCentered
      isOpen={authModalDisclosure.isOpen}
      onClose={authModalDisclosure.onClose}
      size={'sm'}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      // {...rest}
    >
      <ModalOverlay />
      <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 4 }}>
        <ModalHeader color={'primary.500'}>Login</ModalHeader>
        <ModalCloseButton />
        {isAuthLoading && (
          <Center>
            <Spinner />
          </Center>
        )}

        <ModalBody pos="relative" p={0}>
          <Stack spacing={4} flex={1}>
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleSubmitSign)}
            >
              <FormItem
                w="full"
                name="identifier"
                label={t('login.email-or-username.title') as string}
                register={register}
                errors={errors}
              />
              <FormItem
                w="full"
                name="password"
                type="password"
                label={t('login.password.title') as string}
                autoComplete="current-password"
                register={register}
                errors={errors}
              />
              <Button
                isLoading={isAuthLoading || isRedirecting}
                w="full"
                type="submit"
              >
                {t('login.sign-in')}
              </Button>
              {loginMutation.isError &&
                ((loginMutation.error as any)?.response?.data?.type ===
                'unauthorized' ? (
                  <Text fontSize={'sm'} color={'red.500'}>
                    <Trans
                      i18nKey="login.error.unauthorized"
                      components={{
                        a: (
                          <Link
                            isExternal
                            href={'https://www.wsvvrijheid.nl/tr/contact'}
                            color="blue.500"
                          />
                        ),
                      }}
                    />
                  </Text>
                ) : (
                  <Text color="red.500" fontSize="sm">
                    {(loginMutation.error as any)?.response?.data?.message ||
                      'An error occured'}
                  </Text>
                ))}
            </Stack>
            {/* TODO Set session exp time */}

            <Button
              as={Navigate}
              href="/forgot-password"
              variant="link"
              size="sm"
            >
              {t('login.forgot-pass-header.title')}
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </Box>
  )
}
