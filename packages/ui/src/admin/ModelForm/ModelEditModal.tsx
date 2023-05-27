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
  isFullHeight,
  isOpen,
  onClose,
  size = '6xl',
  maxW,
  ...rest
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
              url={url}
              schema={schema}
              fields={fields}
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
