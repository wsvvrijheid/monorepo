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
import { useTranslation } from 'react-i18next'

import { Navigate } from '../Navigate'
import { CreateArtSuccessAlertProps } from './types'

export const ArtCreateSuccessAlert = forwardRef<
  HTMLButtonElement,
  CreateArtSuccessAlertProps
>(({ isOpen, onClose }, ref) => {
  const { t } = useTranslation()

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
            fontWeight={600}
          >
            {t`art.create.success.title`}
          </AlertDialogHeader>

          <AlertDialogBody py={4}>
            <Text>{t`art.create.success.description`}</Text>
            <Navigate href="/profile">
              <Button colorScheme="blue.500">
                {t`art.create.success.link`}
              </Button>
            </Navigate>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>{t`dismiss`}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})
