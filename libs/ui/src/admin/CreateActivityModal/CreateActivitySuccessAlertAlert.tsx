import { forwardRef, RefObject } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Text,
} from '@chakra-ui/react'

import { CreateActivitySuccessAlertProps } from './types'

export const CreateActivitySuccessAlertAlert = forwardRef<
  HTMLButtonElement,
  CreateActivitySuccessAlertProps
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
            Activity successfully submitted
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Text>Activity created successfully.</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup alignSelf="end">
              <Button onClick={onClose}>Show</Button>
              <Button onClick={onClose}>Dismiss</Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})
