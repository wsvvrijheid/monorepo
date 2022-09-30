import { FC, useRef, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { CollectionCreateInput } from '@wsvvrijheid/types'
import { useCreateCollection } from '@wsvvrijheid/utils'
import { useForm } from 'react-hook-form'
import { FaCheck, FaTimes, FaPlus } from 'react-icons/fa'
import * as yup from 'yup'

import { FormItem, FilePicker } from '../../components'
import { CollectionCreateSuccessAlert } from './CreateCollectionSuccessAlert'
import {
  CreateCollectionFormFieldValues,
  CreateCollectionModalProps,
} from './types'

const schema = () =>
  yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  })

// TODO Consider adding modal form instead of a new page
export const CreateCollectionModal: FC<CreateCollectionModalProps> = ({
  queryKey,
}) => {
  const [images, setImages] = useState<Blob[]>([])

  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()
  const toast = useToast()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateCollectionFormFieldValues>({
    resolver: yupResolver(schema()),
    mode: 'all',
  })

  const { mutate, isLoading } = useCreateCollection(queryKey)

  const createCollection = async (
    data: CreateCollectionFormFieldValues & { image: Blob },
  ) => {
    const slug = slugify(data.title)
    const formBody: CollectionCreateInput = {
      ...data,
      slug,
      locale: 'tr',
      publishedAt: null,
    }

    mutate(formBody, {
      onSuccess: () => {
        formDisclosure.onClose()
        successDisclosure.onOpen()
        resetForm()
        resetFileUploader()
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  const handleCreateCollection = async (
    data: CreateCollectionFormFieldValues,
  ) => {
    createCollection({ ...data, image: images[0] })
  }

  const resetFileUploader = () => {
    setImages([])
  }

  const closeForm = () => {
    resetFileUploader()
    resetForm()
    formDisclosure.onClose()
  }

  return (
    <>
      {/* SUCCESS ALERT */}
      <CollectionCreateSuccessAlert
        isOpen={successDisclosure.isOpen}
        onClose={successDisclosure.onClose}
        ref={cancelRef}
      />

      <Button
        size="lg"
        colorScheme="green"
        onClick={formDisclosure.onOpen}
        my={3}
      >
        <Box mr={{ base: 0, lg: 4 }}>
          <FaPlus />
        </Box>
        <Box display={{ base: 'none', lg: 'block' }}>Create Collection</Box>
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={formDisclosure.isOpen}
        onClose={closeForm}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'green'}>Create Collection</ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody pos="relative" py={6}>
            {/* LOADING */}
            {isLoading && (
              <Center
                zIndex={1}
                pos="absolute"
                top={0}
                left={0}
                boxSize="full"
                bg="whiteAlpha.900"
              >
                <Spinner size="xl" colorScheme="blue" />
              </Center>
            )}

            {/* CREATE FORM */}
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleCreateCollection)}
            >
              <FormItem
                name="title"
                label="Title"
                isRequired
                errors={errors}
                register={register}
              />
              <FormItem
                name="description"
                label="Description"
                as={Textarea}
                isRequired
                errors={errors}
                register={register}
              />
              <FilePicker setFiles={setImages} />
              <ButtonGroup alignSelf="end">
                <Button
                  onClick={closeForm}
                  mr={3}
                  ref={cancelRef}
                  leftIcon={<FaTimes />}
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={!images || images.length === 0 || !isValid}
                  type="submit"
                  colorScheme="green"
                  leftIcon={<FaCheck />}
                >
                  Create Collection
                </Button>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
