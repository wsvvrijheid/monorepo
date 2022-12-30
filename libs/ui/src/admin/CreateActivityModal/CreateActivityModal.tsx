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
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useCreateActivity } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import * as yup from 'yup'

import { FilePicker, FormItem } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { CreateActivitySuccessAlertAlert } from './CreateActivitySuccessAlertAlert'
import {
  CreateActivityFormFieldValues,
  CreateActivityModalProps,
} from './types'

export const CreateActivityModal: FC<CreateActivityModalProps> = ({
  queryKey,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()

  const { locale } = useRouter()

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    image: yup.object().shape({
      file: yup.mixed().required('File is required'),
    }),
    date: yup.date().required('Date is required'),
  })

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateActivityFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useFormPersist(`create-activity-${locale}`, {
    watch,
    setValue,
    ...(typeof window !== 'undefined' && { storage: window.sessionStorage }),
  })

  const { mutate, isLoading } = useCreateActivity(queryKey)
  const toast = useToast()
  const auth = useAuthSelector()

  const createActivity = async (
    data: CreateActivityFormFieldValues & { image: File },
  ) => {
    if (!auth.user) return

    const slug = slugify(data.title)

    const creator = auth?.user?.id

    const formBody = {
      ...data,
      slug,
      locale: locale as StrapiLocale,
      publishedAt: null,
      creator,
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

  const handleCreateActivity = async (data: CreateActivityFormFieldValues) => {
    await createActivity({ ...data })
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
      <CreateActivitySuccessAlertAlert
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
        Create Activity
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
          <ModalHeader color={'primary.500'}>Create Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pos="relative" p={8}>
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
              onSubmit={handleSubmit(handleCreateActivity)}
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

                <Stack>
                  <FilePicker setFiles={setImages} />
                  {errors.image && (
                    <Text fontSize={'sm'} color="red.500">
                      {errors.image.message}
                    </Text>
                  )}
                </Stack>
              </Stack>
              {/* right side */}
              <Stack flex={1} spacing={4}>
                <FormItem
                  name="date"
                  label="Date"
                  isRequired
                  errors={errors}
                  register={register}
                  type="date"
                />
                <FormItem
                  name="content"
                  label="Content"
                  as={Textarea}
                  isRequired
                  errors={errors}
                  register={register}
                  size="lg"
                  h="400px"
                  flex={1}
                />

                <ButtonGroup alignSelf="end">
                  <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    Save
                  </Button>

                  <Button
                    onClick={closeForm}
                    // mr={3}
                    ref={cancelRef}
                    leftIcon={<IoMdClose />}
                    colorScheme="red"
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
