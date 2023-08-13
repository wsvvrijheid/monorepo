import React, { useState } from 'react'

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

import { createFeedbackSchema } from './schema'
import { CreateFeedbackFormFieldValues, CreateFeedbackFormProps } from './types'
import { FormItem } from '../FormItem'

export const FeedbackForm: React.FC<CreateFeedbackFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [point, setPoint] = useState<number>()

  const handleFeedback = data => {
    const feedbackData = {
      comment: data,
      point,
    }
    onSubmit(feedbackData)
    console.log('handle feedback', feedbackData)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateFeedbackFormFieldValues>({
    resolver: yupResolver(
      createFeedbackSchema as ObjectSchema<CreateFeedbackFormFieldValues>,
    ),
    mode: 'all',
  })

  const closeModal = () => {
    reset()
    onClose()
  }
  const handlePoint = (data: number) => {
    console.log('data', data)
    setPoint(data)
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
              onSubmit={handleSubmit(handleFeedback)}
            >
              <HStack>
                <ButtonGroup>
                  <Button
                    bg={'transparent'}
                    border="2px"
                    borderRadius="20px"
                    mr={3}
                    _focus={{
                      bg: 'orange',
                      border: 'none',
                    }}
                    onClick={() => handlePoint(1)}
                  >
                    1
                  </Button>
                  <Button
                    bg={'transparent'}
                    border="2px"
                    borderRadius="20px"
                    mr={3}
                    _focus={{
                      bg: 'orange',
                      border: 'none',
                    }}
                    onClick={() => handlePoint(2)}
                  >
                    2
                  </Button>
                  <Button
                    bg={'transparent'}
                    border="2px"
                    borderRadius="20px"
                    mr={3}
                    _focus={{
                      bg: 'orange',
                      border: 'none',
                    }}
                    onClick={() => handlePoint(3)}
                  >
                    3
                  </Button>
                  <Button
                    bg={'transparent'}
                    border="2px"
                    borderRadius="20px"
                    mr={3}
                    _focus={{
                      bg: 'orange',
                      border: 'none',
                    }}
                    onClick={() => handlePoint(4)}
                  >
                    4
                  </Button>
                  <Button
                    bg={'transparent'}
                    border="2px"
                    borderRadius="20px"
                    mr={3}
                    _focus={{
                      bg: 'orange',
                      border: 'none',
                    }}
                    onClick={() => handlePoint(5)}
                  >
                    5
                  </Button>
                </ButtonGroup>
              </HStack>
              <HStack>
                <FormItem<CreateFeedbackFormFieldValues>
                  as={Textarea}
                  name="commend"
                  register={register}
                  errors={
                    errors as FieldErrorsImpl<CreateFeedbackFormFieldValues>
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
