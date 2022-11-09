import { forwardRef, RefObject } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'

import { CreateMainHashtagSuccessAlertProps } from './types'

export const CreateMainHashtagSuccessAlert = forwardRef<
  HTMLButtonElement,
  CreateMainHashtagSuccessAlertProps
>(({ isOpen, onClose }, ref) => {
  return (
    <AlertDialog
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={ref as RefObject<HTMLButtonElement>}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            bg="primary.500"
            color="white"
            fontSize="lg"
            fontWeight="semibold"
          >
            MainHashtag successfully submitted
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Text>MainHashtag created successfully.</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Dismiss</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})
