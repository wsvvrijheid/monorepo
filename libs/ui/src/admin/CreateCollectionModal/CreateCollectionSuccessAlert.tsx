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
            bg="green.500"
            color="white"
            fontSize="lg"
            fontWeight="semibold"
          >
            Collection successfully submitted
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Text>Collection created successfully.</Text>
            <Navigate href="/collections">
              <Button colorScheme="blue.500">Go to collections</Button>
            </Navigate>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Dismiss</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})
