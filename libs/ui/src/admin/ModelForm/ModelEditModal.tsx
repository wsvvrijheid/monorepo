import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react'

import { useModelById } from '@wsvvrijheid/services'
import { StrapiModel } from '@wsvvrijheid/types'

import { ModelEditForm } from './ModelEditForm'
import { ModelEditModalProps } from './types'

export const ModelEditModal = <T extends StrapiModel>({
  fields,
  schema,
  url,
  title,
  hideLanguageSwitcher,
  id,
  isOpen,
  onClose,
}: ModelEditModalProps<T>) => {
  const { data: model, isLoading, refetch } = useModelById<T>({ url, id })

  const handleSuccess = () => {
    refetch()
  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent maxW="95vw" h="full" p={0} overflow={'hidden'}>
        <ModalHeader color={'primary.500'}>{title}</ModalHeader>
        <ModalCloseButton />
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {model && (
          <ModalBody pos="relative" p={0}>
            <ModelEditForm<T>
              url={url}
              schema={schema}
              fields={fields}
              model={model}
              onSuccess={handleSuccess}
              hideLanguageSwitcher={hideLanguageSwitcher}
            />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}
