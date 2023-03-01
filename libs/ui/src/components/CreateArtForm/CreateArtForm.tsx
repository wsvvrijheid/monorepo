import { FC, useRef, useState } from 'react'

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
import { useCreateModelMutation, useSearchModel } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { ArtCreateInput, Category, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { FaPlus, FaUpload } from 'react-icons/fa'
import * as yup from 'yup'

import { ArtCreateSuccessAlert } from './CreateArtSuccessAlert'
import { CreateArtFormFieldValues, CreateArtFormProps } from './types'
import { FilePicker } from '../FilePicker'
import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import { WSelect } from '../WSelect'

const schema = (t: TFunction) =>
  yup.object({
    locale: yup
      .string()
      .required(t('art.create.form.locale-required') as string),
    title: yup.string().required(t('art.create.form.title-required') as string),
    description: yup
      .string()
      .required(t('art.create.form.description-required') as string),
    content: yup
      .string()
      .required(t('art.create.form.content-required') as string),
    categories: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
  })

// TODO Consider adding modal form instead of a new page
export const CreateArtForm: FC<CreateArtFormProps> = ({ queryKey }) => {
  const [image, setImage] = useState<File>()
  const { locale } = useRouter()
  const { t } = useTranslation()
  const categories = useSearchModel<Category>({
    url: 'api/categories',
  })

  const { user, token, isLoggedIn } = useAuthSelector()

  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()
  const toast = useToast()

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    reset: resetForm,
    control,
  } = useForm<CreateArtFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  useFormPersist(`create-art-${locale}`, {
    watch,
    setValue,
    ...(typeof window !== 'undefined' && { storage: window.sessionStorage }),
  })

  const { mutate, isLoading } = useCreateModelMutation('api/arts')

  const createArt = async (
    data: CreateArtFormFieldValues & { image: File },
  ) => {
    if (!user) return

    const slug = slugify(data.title)
    const formBody: ArtCreateInput = {
      ...data,
      slug,
      categories: data.categories?.map(c => Number(c.value)) || [],
      token: token as string,
      publishedAt: null,
    }

    mutate(formBody, {
      onSuccess: () => {
        closeForm()
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
    createArt({ ...data, image: image as File })
  }

  const resetFileUploader = () => {
    setImage(undefined)
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

      <Button size="lg" colorScheme="primary" onClick={formDisclosure.onOpen}>
        <Box mr={{ base: 0, lg: 4 }}>
          <FaUpload />
        </Box>
        <Box display={{ base: 'none', lg: 'block' }}>{t('art.upload')}</Box>
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={formDisclosure.isOpen}
        onClose={closeForm}
        size={isLoggedIn ? '4xl' : 'md'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="primary.500" color={'white'}>
            {t('art.upload')}
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
                <Spinner size="xl" colorScheme="primary" />
              </Center>
            )}

            {!isLoggedIn && (
              <VStack>
                <Text>
                  <>{t('art.create.require-auth.text')} </>
                  <Navigate href="/login" color="primary.500">
                    {t('art.create.require-auth.button')}
                  </Navigate>
                </Text>
              </VStack>
            )}

            {/* CREATE FORM */}
            {isLoggedIn && (
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                <FilePicker setFiles={files => setImage(files[0])} />
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
                      fontWeight={600}
                    >
                      {t('language')}
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
                    label={t('title') as string}
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <WSelect
                    label={t('category') as string}
                    name="categories"
                    errors={errors}
                    control={control}
                    isMulti
                    options={
                      categories.data?.data?.map(c => ({
                        value: c.id.toString(),
                        label: c[`name_${locale as StrapiLocale}`],
                      })) || []
                    }
                  />

                  <FormItem
                    name="description"
                    label={t('description') as string}
                    as={Textarea}
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <FormItem
                    name="content"
                    label={t('content') as string}
                    as={Textarea}
                    isRequired
                    errors={errors}
                    register={register}
                  />

                  <ButtonGroup alignSelf="end">
                    <Button onClick={closeForm} mr={3} ref={cancelRef}>
                      {t('cancel')}
                    </Button>
                    <Button
                      isDisabled={!image || image?.length === 0 || !isValid}
                      type="submit"
                      colorScheme="primary"
                      rightIcon={<FaPlus />}
                    >
                      {t('create')}
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
