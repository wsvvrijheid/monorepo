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
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TFunction } from 'react-i18next'
import * as yup from 'yup'

import {
  FormItem,
  Navigate,
  LoginFormProps,
  LoginFormFieldValues,
  WImage,
  Container,
} from '../../components'

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
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        t('login.password.matches.special'),
      ),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`login.email.required`),
  })

export const AdminLoginForm: React.FC<LoginFormProps> = () => {
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

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: { identifier: string; password: string }) =>
      axios.post('/api/auth/login', body),
    onSuccess: () => {
      reset()
      router.push('/')
    },
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    const body = {
      identifier: data.email,
      password: data.password,
    }

    loginMutation.mutate(body)
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
      <Box pos="relative">
        <WImage
          objectFit="cover"
          src={
            'https://api.samenvvv.nl/uploads/smartmockups_l7y9bzqx_256149ef40.jpeg'
          }
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
            <Avatar size="2xl" src={'https://wsvvrijheid.nl/images/logo.svg'} />

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
              <Button w="full" type="submit" colorScheme="primary">
                Sign in
              </Button>
              {loginMutation.isError && (
                <Text color="red.500" fontSize="sm">
                  An error occured
                </Text>
              )}
            </Stack>
            {/* TODO Set session exp time */}
            <Navigate
              as={Button}
              href="/forgot-password"
              variant="link"
              colorScheme="blue"
              size="sm"
            >
              Forgot your password
            </Navigate>
          </Stack>

          <Text fontSize={'xs'}>
            Wsvvrijheid &copy; {new Date().getFullYear()} All rights reserved
          </Text>
        </Stack>
      </Container>
    </SimpleGrid>
  )
}
