import { Avatar, Box, Button, SimpleGrid, Stack, Text } from '@chakra-ui/react'
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
      <WImage
        objectFit="cover"
        src={
          'https://api.samenvvv.nl/uploads/admin_6c476509d3.png?updated_at=2022-09-08T20:43:14.867Z'
        }
        alt={'admin'}
      />

      {/* right side (second container) */}
      <Stack
        w={'full'}
        textAlign="center"
        bg={'white'}
        spacing={4}
        justify="space-between"
      >
        <Stack mt={8}>
          <Stack textAlign="center" w={'full'}>
            <Box sx={{ h: 'full', '.splide__track': { h: 'full' } }}>
              <Avatar
                size="2xl"
                src={'https://wsvvrijheid.nl/images/logo.svg'}
              />
            </Box>
            <Text fontSize={'medium'} color={'blue.500'} fontWeight={'bolder'}>
              WEES DE STEM
            </Text>
            <Text fontSize={'medium'} color={'blue.500'} fontWeight={'bolder'}>
              VOOR VRIJHEID
            </Text>
          </Stack>
        </Stack>
        <Stack as="form" onSubmit={handleSubmit(handleSubmitSign)}>
          <Stack spacing="5" ml={20} mr={20}>
            <FormItem
              name="email"
              label={'Email'}
              type="email"
              register={register}
              errors={errors}
            />
            <FormItem
              name="password"
              type="password"
              label={'Password'}
              autoComplete="current-password"
              register={register}
              errors={errors}
            />
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

          <Stack justify="space-between">
            <Button type="submit" colorScheme="blue">
              Sign in
            </Button>
            {loginMutation.isError && (
              <Text color="red.500" fontSize="sm">
                An error occured
              </Text>
            )}
          </Stack>
          <Text fontSize={'sm'} mr={1} mb={20}>
            Wsvvrijheid &copy; {new Date().getFullYear()} All rights reserved
          </Text>
        </Stack>
      </Stack>
    </SimpleGrid>
  )
}
