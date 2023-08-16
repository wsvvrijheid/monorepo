import React from 'react'

import { Button, useDisclosure } from '@chakra-ui/react'

import { UserFeedbackForm } from '../UserFeedbackForm'

export const UserFeedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Button
      top={'50%'}
      h={'fit-content'}
      position={'fixed'}
      zIndex={'modal'}
      right={0}
      onClick={onOpen}
      isDisabled={isOpen}
      colorScheme="primary"
      aria-label="Give feedback"
      transform="rotate(180deg)"
      sx={{ writingMode: 'vertical-rl' }}
    >
      Feedback
      <UserFeedbackForm isOpen={isOpen} onClose={onClose} />
    </Button>
  )
}
