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
import { StrapiModel } from '@wsvvrijheid/types'
import { IoMdAdd } from 'react-icons/io'

import { ModelCreateForm } from '.'
import { ModelCreateFormProps } from './types'

export const ModelCreateModal = <T extends StrapiModel>({
  fields,
  onSuccess,
  schema,
  url,
  children,
  title,
  model,
  isField,
}: PropsWithChildren<ModelCreateFormProps<T> & { title: string }>) => {
  const formDisclosure = useDisclosure()

  const handleSuccess = () => {
    formDisclosure.onClose()
    onSuccess?.()
  }

  return (
    <>
      <Button
        leftIcon={<IoMdAdd />}
        colorScheme="primary"
        onClick={formDisclosure.onOpen}
        my={3}
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
              isField={isField}
              onSuccess={handleSuccess}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
