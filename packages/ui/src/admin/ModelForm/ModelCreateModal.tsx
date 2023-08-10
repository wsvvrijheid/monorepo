import { PropsWithChildren } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io'

import { StrapiModel } from '@wsvvrijheid/types'

import { ModelCreateForm } from '.'
import { ModelCreateFormProps } from './types'
import { useHasPermission } from '../../hooks'

export const ModelCreateModal = <T extends StrapiModel>({
  fields,
  onSuccess,
  schema,
  url,
  children,
  title,
  model,
  buttonProps,
  hideLanguageSwitcher,
  allowedRoles,
  shouldPublish,
}: PropsWithChildren<ModelCreateFormProps<T> & { title: string }>) => {
  const formDisclosure = useDisclosure()

  const { getPermission } = useHasPermission()

  const handleSuccess = () => {
    formDisclosure.onClose()
    onSuccess?.()
  }

  if (allowedRoles && !getPermission(allowedRoles)) {
    return null
  }

  return (
    <>
      <Button
        leftIcon={<IoMdAdd />}
        onClick={formDisclosure.onOpen}
        {...buttonProps}
      >
        {children}
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={formDisclosure.isOpen}
        onClose={formDisclosure.onClose}
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'primary.500'}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pos="relative" py={6}>
            <ModelCreateForm<T>
              url={url}
              schema={schema}
              fields={fields}
              model={model}
              shouldPublish={shouldPublish}
              onSuccess={handleSuccess}
              hideLanguageSwitcher={hideLanguageSwitcher}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
