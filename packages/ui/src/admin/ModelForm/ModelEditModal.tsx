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

import { useStrapiRequest } from '@wsvvrijheid/services'
import { StrapiModel } from '@wsvvrijheid/types'

import { ModelEditForm } from './ModelEditForm'
import { ModelEditModalProps } from './types'

export const ModelEditModal = <T extends StrapiModel>({
  endpoint,
  title,
  hideLanguageSwitcher,
  id,
  isFullHeight,
  isOpen,
  onClose,
  size = '6xl',
  maxW,
  ...rest
}: ModelEditModalProps<T>) => {
  const { data, isLoading, refetch } = useStrapiRequest<T>({ endpoint, id })

  const model = data?.data

  const handleSuccess = () => {
    refetch()
  }

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        maxW={maxW}
        p={0}
        overflow={'hidden'}
        {...(isFullHeight && { h: 'full' })}
      >
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
              endpoint={endpoint}
              model={model}
              onSuccess={handleSuccess}
              hideLanguageSwitcher={hideLanguageSwitcher}
              onClose={onClose}
            />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}
