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
import { usePermission } from '../../hooks'

export const ModelCreateModal = <T extends StrapiModel>({
  fields,
  onSuccess,
  schema,
  endpoint,
  children,
  title,
  model,
  buttonProps,
  hideLanguageSwitcher,
  shouldPublish,
}: PropsWithChildren<ModelCreateFormProps<T> & { title: string }>) => {
  const formDisclosure = useDisclosure()

  const { allowEndpointAction } = usePermission()

  const handleSuccess = () => {
    formDisclosure.onClose()
    onSuccess?.()
  }

  const hasPermission = allowEndpointAction(endpoint, 'create')

  return (
    <>
      <Button
        leftIcon={<IoMdAdd />}
        onClick={formDisclosure.onOpen}
        disabled={!hasPermission}
        isDisabled={!hasPermission}
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
              endpoint={endpoint}
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
