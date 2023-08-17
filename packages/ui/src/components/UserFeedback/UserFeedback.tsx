import React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'

import { UserFeedbackForm } from '../UserFeedbackForm'

export const UserFeedback = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Button
      role="button"
      as={'div'}
      cursor={'pointer'}
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
      borderBottomLeftRadius={0}
      borderTopLeftRadius={0}
      transition={'all 0.2s'}
      pr={3}
      pl={3}
      _hover={{
        pl: 5,
      }}
    >
      <Box>Feedback</Box>
      <UserFeedbackForm isOpen={isOpen} onClose={onClose} />
    </Button>
  )
}
