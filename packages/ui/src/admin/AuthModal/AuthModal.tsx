import React, { useState } from 'react'

import {
  Box,
  Button,
  Center,
  Container,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useTranslation, Trans } from 'react-i18next'

import { useAuthContext } from '@wsvvrijheid/context'

import {
  FormItem,
  LoginFormFieldValues,
  Navigate,
  WAvatar,
} from '../../components'
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
        authModalDisclosure.onClose()
        await router.push('/')
        setIsRedirecting(false)
      },
    })
  }

  return (
    <Box bg="red">
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
          <ModalBody>
            <Container maxW={{ base: 'full', lg: 300 }}>
              {/* right side (second container) */}
              <Stack
                h="full"
                w="full"
                textAlign="center"
                spacing={4}
                justify="center"
                pb={8}
                pt={{ base: 8, lg: '50%' }}
              >
                <Navigate href="/">
                  <VStack textAlign="center" w={'full'}>
                    <WAvatar size="2xl" src={`/images/wsvvrijheid-logo.svg`} />

                    <Text fontSize="xl" color={'blue.500'} fontWeight={900}>
                      WEES DE STEM <br />
                      VOOR VRIJHEID
                    </Text>
                  </VStack>
                </Navigate>

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
                          {(loginMutation.error as any)?.response?.data
                            ?.message || 'An error occured'}
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

                <Text fontSize={'xs'}>
                  Wsvvrijheid &copy; {new Date().getFullYear()} All rights
                  reserved
                </Text>
              </Stack>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
