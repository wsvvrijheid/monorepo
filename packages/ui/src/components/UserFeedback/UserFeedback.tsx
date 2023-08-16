import React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'

import { UserFeedbackForm } from '../UserFeedbackForm'

export const UserFeedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as={Button}
      top={'50%'}
      position={'fixed'}
      zIndex={'modal'}
      right={0}
      onClick={onOpen}
      isDisabled={isOpen}
      colorScheme="primary"
      aria-label="Plus"
      transform="rotate(270deg)"
    >
      Feedback
      <UserFeedbackForm isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
