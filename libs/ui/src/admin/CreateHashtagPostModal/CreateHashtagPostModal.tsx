import { FC, useRef, useState } from 'react'

import {
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useCreateHashtagPost, useHashtags } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useForm } from 'react-hook-form'
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
  const [images, setImages] = useState<Blob[]>([])
  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()

  const [locale, setLocale] = useState<StrapiLocale>('en')
  const hashtags = useHashtags()
  const currentHashtag = hashtags?.data
  console.log('hashtags', currentHashtag)

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtag: yup.string().required('Content is required'),
    postsource: yup.string(),
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateHashtagPostFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const { mutate, isLoading } = useCreateHashtagPost(locale, queryKey)
  const toast = useToast()
  const auth = useAuthSelector()
  console.log('created', auth.user?.id)
  const createHashtagPost = async (
    data: CreateHashtagPostFormFieldValues & { image: Blob },
  ) => {
    if (!auth.user) return
    console.log('data in createHashtag Post', data)
    const slug = slugify(data.title)
    const hashtag = data.hashtag?.map(c => Number(c.value))
    const creater = auth?.user?.id
    const formBody = {
      ...data,
      slug,
      locale,
      publishedAt: null,
      hashtag,
      creater,
    }

    mutate(formBody, {
      onSuccess: async () => {
        formDisclosure.onClose()
        successDisclosure.onOpen()
        resetForm()
        resetFileUploader()
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
    createHashtagPost({ ...data, image: images[0] })
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
          <HStack justify={'end'}>
            <Text color={'primary.500'} mr="20px">
              Added {0} Posts
            </Text>
          </HStack>
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
                  <LanguageSwitcher
                    defaultLocale={locale as StrapiLocale}
                    onLanguageSwitch={setLocale}
                  />
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
                  name="postsource"
                  label="Post source"
                  errors={errors}
                  register={register}
                />
                <FilePicker setFiles={setImages} />

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
