import { FC, useEffect, useRef, useState } from 'react'

import {
  Box,
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
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useCreateArt, useGetArtCategories } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TFunction } from 'react-i18next'
import { FaPlus, FaUpload } from 'react-icons/fa'
import * as yup from 'yup'

import { FileUploader } from '../FileUploader'
import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import { WSelect } from '../WSelect'
import { ArtCreateSuccessAlert } from './CreateArtSuccessAlert'
import { CreateArtFormFieldValues, CreateArtFormProps } from './types'

const schema = (t: TFunction) =>
  yup.object({
    locale: yup.string().required(t`art.create.form.locale-required`),
    title: yup.string().required(t`art.create.form.title-required`),
    description: yup.string().required(t`art.create.form.description-required`),
    content: yup.string().required(t`art.create.form.content-required`),
    categories: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
  })

// TODO Consider adding modal form instead of a new page
export const CreateArtForm: FC<CreateArtFormProps> = ({ auth, queryKey }) => {
  const [images, setImages] = useState<Blob[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const { locale } = useRouter()
  const { t } = useTranslation()
  const categories = useGetArtCategories()

  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()
  const toast = useToast()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset: resetForm,
    control,
  } = useForm<CreateArtFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach(image => URL.revokeObjectURL((image as any).preview))
    },
    [images],
  )

  const { mutate, isLoading } = useCreateArt(queryKey)

  const createArt = async (
    data: CreateArtFormFieldValues & { images: Blob[] },
  ) => {
    if (!auth.user) return

    const slug = slugify(data.title)
    const formBody = {
      ...data,
      slug,
      artist: auth.user.id,
      categories: data.categories?.map(c => Number(c.value)),
    }

    mutate(formBody, {
      onSuccess: () => {
        formDisclosure.onClose()
        successDisclosure.onOpen()
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

  const handleCreateArt = async (data: CreateArtFormFieldValues) => {
    createArt({ ...data, images })
  }

  const resetFileUploader = () => {
    setImages([])
    setPreviews([])
  }

  const closeForm = () => {
    resetFileUploader()
    resetForm()
    formDisclosure.onClose()
  }

  return (
    <>
      {/* SUCCESS ALERT */}
      <ArtCreateSuccessAlert
        isOpen={successDisclosure.isOpen}
        onClose={successDisclosure.onClose}
        ref={cancelRef}
      />

      <Button size="lg" colorScheme="blue" onClick={formDisclosure.onOpen}>
        <Box mr={{ base: 0, lg: 4 }}>
          <FaUpload />
        </Box>
        <Box display={{ base: 'none', lg: 'block' }}>{t`art.upload`}</Box>
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={formDisclosure.isOpen}
        onClose={closeForm}
        size={auth.isLoggedIn ? '4xl' : 'md'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="blue.500" color={'white'}>
            {t`art.upload`}
          </ModalHeader>
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

            {!auth.isLoggedIn && (
              <VStack>
                <Text>
                  {t`art.create.require-auth.text`}{' '}
                  <Navigate href="/user/login" color="blue.500">
                    {t`art.create.require-auth.button`}
                  </Navigate>
                </Text>
              </VStack>
            )}

            {/* CREATE FORM */}
            {auth.isLoggedIn && (
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                <FileUploader
                  images={images}
                  previews={previews}
                  setImages={setImages}
                  setPreviews={setPreviews}
                />
                <Stack
                  spacing={4}
                  as="form"
                  onSubmit={handleSubmit(handleCreateArt)}
                >
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      htmlFor="locale"
                      mb={2}
                      mt={2}
                      fontWeight={'600'}
                    >
                      {t`language`}
                    </FormLabel>
                    <Select
                      defaultValue={locale}
                      {...register('locale')}
                      id="locale"
                    >
                      <option value={'en'}>EN (English)</option>
                      <option value={'nl'}>NL (Nederlands)</option>
                      <option value={'tr'}>TR (Türkçe)</option>
                    </Select>
                  </FormControl>
                  <FormItem
                    name="title"
                    label={t`title`}
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <WSelect
                    label={t('category')}
                    name="categories"
                    errors={errors}
                    control={control as any}
                    isMulti
                    options={
                      categories.data?.map(c => ({
                        value: c.id.toString(),
                        label: c[`name_${locale as StrapiLocale}`],
                      })) || []
                    }
                  />

                  <FormItem
                    name="description"
                    label={t`description`}
                    as={Textarea}
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <FormItem
                    name="content"
                    label={t`content`}
                    as={Textarea}
                    isRequired
                    errors={errors}
                    register={register}
                  />

                  <ButtonGroup alignSelf="end">
                    <Button onClick={closeForm} mr={3} ref={cancelRef}>
                      {t`cancel`}
                    </Button>
                    <Button
                      isDisabled={!images || images?.length === 0 || !isValid}
                      type="submit"
                      colorScheme="blue"
                      rightIcon={<FaPlus />}
                    >
                      {t`create`}
                    </Button>
                  </ButtonGroup>
                </Stack>
              </SimpleGrid>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
