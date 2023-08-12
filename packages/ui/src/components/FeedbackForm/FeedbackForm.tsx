import React from 'react'

import {
  Box,
  Button,
  ButtonGroup,
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
import { FiArrowUpRight } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'

import { CreateFeedbackFormFieldValues, CreateFeedbackFormProps } from './types'
import { FormItem } from '../FormItem'

// type CreateFeedbackFormProps = {
//   image: UploadFile
//   comment: string
//   point: number
// }

export const FeedbackForm: React.FC<CreateFeedbackFormProps> = ({
  isOpen,
  onClose,
}) => {
  const handleFeedback = data => {
    console.log('handle feedback', data)
  }
  const closeModal = () => {
  //  reset()
    onClose()
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
              onSubmit={handleFeedback}
              // onSubmit={handleSubmit(handleFeedback)}
              //
            >
              <Stack>
                {/* <FormItem<CreateFeedbackFormFieldValues>
                  as={Textarea}
                  name="commend"
                  label="Feedback"
                  //  register={register}
                  //  errors={errors as FieldErrorsImpl<CreateTweetFormFieldValues>}
                  isRequired
                /> */}

              </Stack>
              <ButtonGroup alignSelf="end">
                <Button
                  bg={'transparent'}
                  mr={3}
                  leftIcon={<GrFormClose />}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type={'submit'}
                  colorScheme="purple"
                  leftIcon={<FiArrowUpRight />}
                >
                  Send Feedback
                </Button>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
