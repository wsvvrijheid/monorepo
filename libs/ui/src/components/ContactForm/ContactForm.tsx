import * as React from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsPerson } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import * as yup from 'yup'

import { FormItem } from '../FormItem'
import { ContactFormProps, ContactFormFieldValues } from './types'

const schema = (t: TFunction) =>
  yup.object({
    fullname: yup.string().required(t`contact.form.fullname-required`),
    email: yup
      .string()
      .email(t`contact.form.email-invalid`)
      .required(t`contact.form.email-required`),
    message: yup.string().required(t`contact.form.message-required`),
  })

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmitHandler,
  isLoading,
  isSuccess,
  isError,
  errorMessage,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<ContactFormFieldValues> = async data => {
    await onSubmitHandler(data)
    reset()
  }

  return (
    <Stack rounded="lg" p={{ base: 8, lg: 16 }} shadow="base" spacing={4}>
      <Stack>
        <Heading size="lg">{t('contact.title')}</Heading>
        <Text fontSize="sm">{t('contact.fill-form')}</Text>
      </Stack>
      <Divider />
      <VStack spacing={5} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          name="fullname"
          label={t('contact.form.fullname-label')}
          leftElement={<BsPerson color="gray.800" />}
          errors={errors}
          register={register}
        />
        <FormItem
          name="email"
          type="email"
          label="Email"
          leftElement={<MdEmail color="gray.200" />}
          helperText={t('contact.form.email-helper')}
          errors={errors}
          register={register}
        />
        <FormItem
          as={Textarea}
          name="message"
          label={t('contact.form.message-label')}
          errors={errors}
          register={register}
        />

        <Button
          variant="solid"
          colorScheme="primary"
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading}
          w="full"
        >
          {t('contact.form.button')}
        </Button>

        {isSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertDescription>
              {t('contact.form.message-delivered')}
            </AlertDescription>
          </Alert>
        )}
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              {t('contact.form.failed')}
              {'  '}
              {errorMessage ? errorMessage : ''}
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </Stack>
  )
}
