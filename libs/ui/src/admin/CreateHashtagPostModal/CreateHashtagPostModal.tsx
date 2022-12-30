import { FC, useRef } from 'react'

import {
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useCreateHashtagPost, useHashtags } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import * as yup from 'yup'

import { FilePicker, FormItem, WSelect } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { CreateHashtagPostSuccessAlert } from './CreateHashtagPostSuccessAlert'
import {
  CreateHashtagPostFormFieldValues,
  CreateHashtagPostModalProps,
} from './types'

export const CreateHashtagPostModal: FC<CreateHashtagPostModalProps> = ({
  queryKey,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()

  const hashtags = useHashtags()
  const currentHashtag = hashtags?.data
  const { locale } = useRouter()

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtag: yup.object().required('Hashtag is required'),
    image: yup.object().shape({
      file: yup.mixed().required('File is required'),
    }),
    reference: yup.string(),
  })

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateHashtagPostFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useFormPersist(`create-hashtag-post-${locale}`, {
    watch,
    setValue,
    ...(typeof window !== 'undefined' && { storage: window.sessionStorage }),
  })

  const { mutate, isLoading } = useCreateHashtagPost(queryKey)
  const toast = useToast()
  const auth = useAuthSelector()

  const createHashtagPost = async (
    data: CreateHashtagPostFormFieldValues & { image: File },
  ) => {
    if (!auth.user) return

    const slug = slugify(data.title)
    const hashtag = parseInt(data.hashtag?.value)
    const creater = auth?.user?.id

    const formBody = {
      ...data,
      slug,
      locale: locale as StrapiLocale,
      hashtag,
      publishedAt: null,
      creater,
    }

    mutate(formBody, {
      onSuccess: async () => {
        formDisclosure.onClose()
        successDisclosure.onOpen()
        resetForm()
      },
      onError: error => {
        toast({
          title: 'Error',
          description: `Something went wrong ${
            (error as any)?.response?.data.error.message
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  const handleCreatePost = async (data: CreateHashtagPostFormFieldValues) => {
    createHashtagPost({ ...data })
  }

  const closeForm = () => {
    resetForm()
    formDisclosure.onClose()
  }

  const setImages = (images: File[]) => {
    setValue('image', images[0])
  }

  return (
    <>
      {/* SUCCESS ALERT */}
      <CreateHashtagPostSuccessAlert
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
        Create Post
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
          <ModalHeader color={'primary.500'}>Create Post</ModalHeader>
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
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
              as="form"
              onSubmit={handleSubmit(handleCreatePost)}
            >
              {/* left side */}
              <Stack flex={1} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Locale</FormLabel>
                  <LanguageSwitcher />
                </FormControl>
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
                  name="content"
                  label="Content"
                  as={Textarea}
                  isRequired
                  errors={errors}
                  register={register}
                />
              </Stack>
              {/* right side */}
              <Stack flex={1} spacing={4}>
                <WSelect
                  name="hashtag"
                  label="Main Hashtag"
                  isRequired
                  control={control}
                  errors={errors}
                  options={
                    currentHashtag?.map(c => ({
                      value: c.id.toString(),
                      label: c.title.toString(),
                    })) || []
                  }
                />
                <FormItem
                  name="reference"
                  label="Source Link"
                  errors={errors}
                  register={register}
                />
                <Stack>
                  <FilePicker setFiles={setImages} />
                  {errors.image && (
                    <Text fontSize={'sm'} color="red.500">
                      {errors.image.message}
                    </Text>
                  )}
                </Stack>

                <Spacer />

                <ButtonGroup alignSelf="end">
                  <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    Create
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
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
