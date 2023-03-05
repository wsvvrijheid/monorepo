import {
  Avatar,
  Box,
  Button,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { API_URL } from '@wsvvrijheid/config'
import { checkAuth, useAppDispatch, useAuthSelector } from '@wsvvrijheid/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

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
    email: yup
      .string()
      .email(t('contact.form.email-invalid') as string)
      .required(t('login.email.required') as string),
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

  const { isAuthLoading } = useAuthSelector()

  const router = useRouter()
  const dispatch = useAppDispatch()

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
    <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
      <Box pos="relative">
        <WImage
          style={{ objectFit: 'cover' }}
          src={`${API_URL}/uploads/smartmockups_l7y9bzqx_256149ef40.jpeg`}
          alt={'admin'}
        />
        <Box
          pos="absolute"
          top={0}
          left={0}
          boxSize="full"
          bgGradient="linear(to-t, blue.500, blackAlpha.500)"
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
              src={`${API_URL}/uploads/wsvvrijheid_051c420ab0.svg`}
            />

            <Text fontSize="xl" color={'blue.500'} fontWeight={700}>
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
                name="email"
                label={'Email'}
                type="email"
                register={register}
                errors={errors}
              />
              <FormItem
                w="full"
                name="password"
                type="password"
                label={'Password'}
                autoComplete="current-password"
                register={register}
                errors={errors}
              />
              <Button
                isLoading={isAuthLoading}
                w="full"
                type="submit"
                colorScheme="primary"
              >
                Sign in
              </Button>
              {loginMutation.isError && (
                <Text color="red.500" fontSize="sm">
                  {(loginMutation.error as any)?.response?.data?.message ||
                    'An error occured'}
                </Text>
              )}
            </Stack>
            {/* TODO Set session exp time */}

            <Button
              as={Navigate}
              href="/forgot-password"
              variant="link"
              colorScheme="blue"
              size="sm"
            >
              Forgot your password
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
