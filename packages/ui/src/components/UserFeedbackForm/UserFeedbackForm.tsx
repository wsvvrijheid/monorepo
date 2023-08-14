import React from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldErrorsImpl, useForm } from 'react-hook-form'
import { IoSend } from 'react-icons/io5'
import { ObjectSchema } from 'yup'

import { useUserFeedbackMutation } from '@wsvvrijheid/services'
import { UserFeedbackCreateInput } from '@wsvvrijheid/types'

import { createUserFeedbackSchema } from './schema'
import {
  CreateUserFeedbackFormFieldValues,
  CreateUserFeedbackFormProps,
} from './types'
import { FormItem } from '../FormItem'

export const UserFeedbackForm: React.FC<CreateUserFeedbackFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutateAsync } = useUserFeedbackMutation()

  const handleUserFeedback = async (
    data: CreateUserFeedbackFormFieldValues,
  ) => {
    const userFeedback: UserFeedbackCreateInput = {
      comment: data?.comment,
      point: data?.point as number,
    }
    await mutateAsync(userFeedback)
    reset()
    onClose()
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<CreateUserFeedbackFormFieldValues>({
    resolver: yupResolver(
      createUserFeedbackSchema as ObjectSchema<CreateUserFeedbackFormFieldValues>,
    ),
    mode: 'all',
  })
  const point = watch('point')

  const closeModal = () => {
    reset()
    onClose()
  }
  const handlePoint = (data: number) => {
    console.log('data', data)
    setValue('point', data)
    //  setPoint(data)
  }

  return (
    <Box>
      <Modal
        size="sm"
        onClose={closeModal}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalHeader>
            <Text color={'primary.500'} fontWeight={700} w={'full'}>
              Feedback
            </Text>
          </ModalHeader>
          <ModalBody>
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleUserFeedback)}
            >
              <HStack>
                <ButtonGroup>
                  {[1, 2, 3, 4, 5].map(p => (
                    <Button
                      key={p}
                      bg={point === p ? 'orange' : 'transparent'}
                      border={point === p ? 'none' : '2px'}
                      borderRadius="20px"
                      _hover={{ color: 'primary.100' }}
                      mr={3}
                      onClick={() => handlePoint(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </ButtonGroup>
              </HStack>
              <HStack>
                <FormItem<CreateUserFeedbackFormFieldValues>
                  as={Textarea}
                  name="comment"
                  register={register}
                  errors={
                    errors as FieldErrorsImpl<CreateUserFeedbackFormFieldValues>
                  }
                  isRequired
                />

                <Button
                  bg={'transparent'}
                  type={'submit'}
                  leftIcon={<IoSend />}
                ></Button>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
