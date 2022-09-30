import { FC, useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

export type WConfirmProps = {
  buttonText: string
  description: string
  isOpen: boolean
  isWarning?: boolean
  title: string
  onClose: () => void
  onConfirm: () => void
}

export const WConfirm: FC<WConfirmProps> = ({
  buttonText,
  description,
  isOpen,
  isWarning,
  title,
  onClose,
  onConfirm,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={isWarning ? 'red' : 'primary'}
              onClick={handleConfirm}
              ml={3}
            >
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
