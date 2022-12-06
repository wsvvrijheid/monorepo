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

import { Navigate } from '../../components'
import { CreateCollectionSuccessAlertProps } from './types'

export const CollectionCreateSuccessAlert = forwardRef<
  HTMLButtonElement,
  CreateCollectionSuccessAlertProps
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
            Collection successfully submitted
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Text>Collection created successfully.</Text>

            <Button as={Navigate} href="/collections" colorScheme="blue.500">
              Go to collections
            </Button>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Dismiss</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})
