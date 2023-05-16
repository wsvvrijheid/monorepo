import { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { TFunction, Trans, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '@wsvvrijheid/context'

import {
  Container,
  FormItem,
  LoginFormFieldValues,
  Navigate,
  WImage,
} from '../../components'

const schema = (t: TFunction) =>
  yup.object({
    password: yup.string().required(t('login.password.required') as string),
    identifier: yup
      .string()
      .required(t('login.email-or-username.required') as string),
  })

export const AdminLoginForm = () => {
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

  const [isRedirecting, setIsRedirecting] = useState(false)

  const { isLoading: isAuthLoading, login } = useAuthContext()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
    onSuccess: async data => {
      setIsRedirecting(true)
      reset()
      await router.push('/')
      setIsRedirecting(false)
    },
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data)
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
      <Box pos="relative" h={{ base: 200, lg: 'full' }}>
        <WImage
          style={{ objectFit: 'cover' }}
          src={`https://images.unsplash.com/photo-1433321768402-897b0324c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=50`}
          alt={'admin'}
        />
        <Box
          pos="absolute"
          top={0}
          left={0}
          boxSize="full"
          bgGradient="linear(to-tl, blackAlpha.700, green.500)"
          opacity={0.5}
        />
      </Box>
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
          <VStack textAlign="center" w={'full'}>
            <Avatar
              size="2xl"
              src={`https://api.wsvvrijheid.nl/uploads/android_chrome_192x192_2a6a31278b.png`}
            />

            <Text fontSize="xl" color={'blue.500'} fontWeight={900}>
              WEES DE STEM <br />
              VOOR VRIJHEID
            </Text>
          </VStack>

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

          <Text fontSize={'xs'}>
            Wsvvrijheid &copy; {new Date().getFullYear()} All rights reserved
          </Text>
        </Stack>
      </Container>
    </SimpleGrid>
  )
}
