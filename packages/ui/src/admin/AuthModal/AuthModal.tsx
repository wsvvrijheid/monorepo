import { useState } from 'react'

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

import { useAuthContext } from '@wsvvrijheid/context'

import {
  FormItem,
  LoginFormFieldValues,
  Navigate,
  WAvatar,
} from '../../components'
import { adminLoginSchema } from '../AdminLoginForm/schema'

export const AuthModal = () => {
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
    closeAuthModal,
    isAuthModalOpen,
  } = useAuthContext()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data, {
      onSuccess: async () => {
        setIsRedirecting(true)
        reset()
        closeAuthModal()
        await router.push('/')
        setIsRedirecting(false)
      },
    })
  }

  return (
    <Modal
      isCentered
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        <ModalBody>
          <Stack textAlign="center" spacing={4} py={4} justify="center">
            <Navigate href="/">
              <VStack textAlign="center" w={'full'}>
                <WAvatar boxSize={100} src={`/images/wsvvrijheid-logo.svg`} />
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
                      {(loginMutation.error as any) || 'An error occured'}
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
              Wsvvrijheid &copy; {new Date().getFullYear()} All rights reserved
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
