import { FC, useRef, useState } from 'react'

import {
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
  HStack,
  Textarea,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { HashtagCreateInput, StrapiLocale } from '@wsvvrijheid/types'
import { useCreateCollection } from '@wsvvrijheid/utils'
import { useForm } from 'react-hook-form'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import * as yup from 'yup'

import { FormItem, FilePicker } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { CreateMainHashtagSuccessAlert } from './CreateMainHashtagSuccessAlert'
import {
  CreateMainHashtagFormFieldValues,
  CreateMainHashtagModalProps,
  //   Mention,
} from './types'

const schema = () =>
  yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  })

export const CreateMainHashtagModal: FC<CreateMainHashtagModalProps> = ({
  queryKey,
  data: Mention,
}) => {
  const [images, setImages] = useState<Blob[]>([])
  //const [mention, setMentions] = useState<Mention>([])

  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()
  const toast = useToast()

  const [locale, setLocale] = useState<StrapiLocale>('en')

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateMainHashtagFormFieldValues>({
    resolver: yupResolver(schema()),
    mode: 'all',
  })

  const { mutate, isLoading } = useCreateCollection(queryKey)

  const createMainHashtag = async (
    data: CreateMainHashtagFormFieldValues & { image: Blob },
  ) => {
    const slug = slugify(data.title)
    const formBody: HashtagCreateInput = {
      ...data,
      slug,
      locale,
      publishedAt: null,
      content: '',
      date: '',
      hashtag: '',
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

  const handleCreateMainHashtag = async (
    data: CreateMainHashtagFormFieldValues,
  ) => {
    createMainHashtag({ ...data, image: images[0] })
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
      <CreateMainHashtagSuccessAlert
        isOpen={successDisclosure.isOpen}
        onClose={successDisclosure.onClose}
        ref={cancelRef}
      />

      <Button
        leftIcon={<IoMdAdd />}
        colorScheme="primary"
        onClick={formDisclosure.onOpen}
        my={3}
      >
        Create Main Hashtag
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
          <ModalHeader color={'primary.500'}>Create Main Hashtag</ModalHeader>
          <ModalCloseButton />
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
            <HStack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleCreateMainHashtag)}
            >
              <Stack>
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
                <FormItem
                  name="description"
                  label="Content"
                  as={Textarea}
                  isRequired
                  errors={errors}
                  register={register}
                />
                <HStack>
                  <LanguageSwitcher
                    defaultLocale={locale as StrapiLocale}
                    onLanguageSwitch={setLocale}
                  />
                  <Text>Date here</Text>
                </HStack>
                <HStack>
                  <FormItem
                    name="description"
                    label="Hashtag"
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <FormItem
                    name="description"
                    label="Extra hashtag"
                    errors={errors}
                    register={register}
                  />
                </HStack>
              </Stack>
              <Stack>
                <FilePicker setFiles={setImages} />
                {/*Mentions mention list should be here */}
                <FormItem
                  name="description"
                  label="Mentions"
                  isRequired
                  errors={errors}
                  register={register}
                />

                {/*================ */}
                <ButtonGroup alignSelf="end">
                  <Button
                    isDisabled={!images || images.length === 0 || !isValid}
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    save
                  </Button>
                  <Button
                    isDisabled={!images || images.length === 0 || !isValid}
                    type="submit"
                    colorScheme="blue"
                    leftIcon={<IoMdCheckmark />}
                  >
                    Publish
                  </Button>
                  <Button
                    onClick={closeForm}
                    mr={3}
                    ref={cancelRef}
                    leftIcon={<IoMdClose />}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Stack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
