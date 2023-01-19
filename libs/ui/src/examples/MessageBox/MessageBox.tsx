import { FC } from 'react'

import {
  Flex,
  useBreakpointValue,
  VStack,
  Textarea,
  Button,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { TFunction, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { MessageBoxFieldValues, MessageBoxProps } from './types'
import { FormItem } from '../../components'
import { Notification } from '../Notification'

const schema = (t: TFunction) =>
  yup.object({
    message: yup
      .string()
      .required(t('contact.form.message-required') as string),
  })

export const MessageBox: FC<MessageBoxProps> = ({
  onSubmitHandler,
  isLoading,
  isSuccess,
  isError,
}) => {
  const { t } = useTranslation()
  const size = useBreakpointValue({ base: 'md', lg: 'lg' })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MessageBoxFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<MessageBoxFieldValues> = async data => {
    onSubmitHandler(data)
  }

  return (
    <VStack
      spacing={5}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      alignItems="stretch"
    >
      <FormItem
        as={Textarea}
        name="message"
        errors={errors}
        register={register}
      />
      <Flex
        minWidth="max-content"
        justifyContent={{ base: 'center', lg: 'end' }}
        gap="2"
      >
        {/* <ButtonGroup gap="2" w={{ base: 'full' }}> */}
        <Button
          size={size}
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading}
          w={{ base: 'full', lg: 'auto' }}
        >
          Cancel
        </Button>
        <Button
          size={size}
          colorScheme="blue"
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading}
          w={{ base: 'full', lg: 'auto' }}
        >
          Send
        </Button>
        {/* </ButtonGroup> */}
      </Flex>

      <Notification
        description={
          isSuccess
            ? 'Message has ben sent successfully'
            : 'An Error Occured while sending your message'
        }
        isOpen={isSuccess || isError}
        status={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success' : 'Error'}
      />
    </VStack>
  )
}
export default MessageBox
