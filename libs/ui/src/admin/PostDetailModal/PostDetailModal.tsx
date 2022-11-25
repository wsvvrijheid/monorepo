import { FC, useRef, useState } from 'react'

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  Textarea,
  useBoolean,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import slugify from '@sindresorhus/slugify'
import { useHashtags, useUpdatePostMutation } from '@wsvvrijheid/services'
import { Post, StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { HiOutlineCheck, HiOutlineX, HiPencil } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdOutlinePublish, MdOutlineUnpublished } from 'react-icons/md'
import * as yup from 'yup'

import {
  EditableFormItem,
  FilePicker,
  WConfirm,
  WImage,
  WSelect,
} from '../../components'
import { CreateHashtagPostFormFieldValues } from '../CreateHashtagPostModal'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { PostDetailModalProps } from './types'

export const PostDetailModal: FC<PostDetailModalProps> = ({
  localizePost,
  isOpen,
  onDelete,
  onPublish,
  unPublish,
  onClose,
  onApprove,
  confirmState,
}) => {
  const { locale } = useRouter()

  const [isEditingImage, setIsEditingImage] = useBoolean(false)
  const [imagePreview, setImagePreview] = useState<string>()
  const [isEditingHashtag, setIsEditingHashtag] = useBoolean(false)
  const confirmDisclosure = useDisclosure()

  const cancelRef = useRef<HTMLButtonElement>(null)
  const hashtags = useHashtags()
  const currentHashtag = hashtags?.data
  console.log('hashtags', currentHashtag)
  console.log('localizepost', localizePost)

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtag: yup.object().required('Hashtag is required'),
    image: yup.mixed().required('Image is required'),
    reference: yup.string(),
  })
  //update postapprovalStatus
  const postApprovalStatus = 'pending'
  const [hashtagPost, setHashtagPost] = useState<Post>(
    localizePost[locale as StrapiLocale],
  )

  useUpdateEffect(() => {
    const hashtagPost = localizePost[locale as StrapiLocale]
    if (hashtagPost === undefined) {
      console.log('undefined >>>>>>>>>>>>>>>>>>>>>.')
      onClose()
    }
    setHashtagPost(hashtagPost)
  }, [locale])

  const formMethods = useForm<CreateHashtagPostFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ...hashtagPost,
      hashtag: {
        value: hashtagPost.hashtag?.title || '',
        label: 'Hashtag',
      },
      title: hashtagPost?.title,
    },
  })

  const closeForm = () => {
    onClose()
  }

  const { mutateAsync: updatePost } = useUpdatePostMutation()

  const [title, description, content, hashtag, image, reference] =
    formMethods.watch([
      'title',
      'description',
      'content',
      'hashtag',
      'image',
      'reference',
    ])

  const fields = [title, description, content, hashtag, image, reference]

  /* save fields*/

  const handleSave = async (field: string) => {
    const fieldIndex = [
      'title',
      'description',
      'content',
      'hashtag',
      'image',
      'reference',
    ].indexOf(field)

    if (field === 'title') {
      const slug = slugify(title)
      return updatePost({
        id: hashtagPost.id,
        title,
        slug,
      })
    } else {
      return updatePost({
        id: hashtagPost.id,
        [field]: fields[fieldIndex],
      })
    }
  }

  const handlePublish = () => onPublish(hashtagPost.id)
  const handleUnPublish = () => unPublish(hashtagPost.id)
  const handleDelete = () => onDelete(hashtagPost.id)
  const handleApprove = () => onApprove(hashtagPost.id)
  console.log('current post title', hashtagPost.title)
  return (
    <>
      {confirmState && (
        <WConfirm
          isOpen={confirmDisclosure.isOpen}
          onClose={confirmDisclosure.onClose}
          {...confirmState}
        />
      )}

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'primary.500'}>Hashtag Post Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pos="relative" py={6}>
            {/* HASHTAG POST DETAILS */}
            <FormProvider {...formMethods}>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={8}
                as="form"
              >
                {/* LEFT SIDE */}
                <Stack flex={1} spacing={4}>
                  {/*title ========== */}
                  <Stack align="start" justify={'start'} w="full">
                    <FormControl isRequired>
                      <FormLabel>Locale</FormLabel>
                      <LanguageSwitcher />
                    </FormControl>
                    <EditableFormItem
                      name="title"
                      label="Title"
                      isRequired
                      onSave={() => handleSave('title')}
                    />
                  </Stack>
                  {/*description ========== */}
                  <Stack align="start" justify={'start'} w="full">
                    <EditableFormItem
                      name="description"
                      label="Description"
                      isRequired
                      as={Textarea}
                      onSave={() => handleSave('description')}
                    />
                  </Stack>
                  {/*content ========== */}

                  <Stack align="start" justify={'start'} w="full">
                    <EditableFormItem
                      name="content"
                      label="Content"
                      isRequired
                      as={Textarea}
                      onSave={handleSave}
                    />
                  </Stack>
                  {/*locales ========== */}
                </Stack>
                {/* RIGHT SIDE */}
                <Stack flex={1} spacing={4}>
                  {/* hashtag ==========*/}
                  {isEditingHashtag ? (
                    <WSelect
                      name="hashtag"
                      label="Main Hashtag"
                      isRequired
                      control={formMethods.control}
                      errors={formMethods.formState.errors}
                      options={
                        currentHashtag?.map(c => ({
                          value: c.id.toString(),
                          label: c.title.toString(),
                        })) || []
                      }
                      onBlur={() => {
                        setIsEditingHashtag.off()
                        handleSave('hashtag')
                      }}
                    />
                  ) : (
                    <Stack justify={'stretch'}>
                      <HStack>
                        <Text fontWeight={600} fontSize={'sm'}>
                          Hashtag
                        </Text>
                        <IconButton
                          aria-label="Edit"
                          size={'xs'}
                          rounded={'full'}
                          onClick={setIsEditingHashtag.toggle}
                          variant="outline"
                          icon={isEditingHashtag ? <FaTimes /> : <HiPencil />}
                        />
                      </HStack>
                      <Text>{hashtagPost?.hashtag?.title}</Text>
                    </Stack>
                  )}

                  <EditableFormItem
                    name="reference"
                    label="Source Link"
                    onSave={handleSave}
                  />
                  <Stack>
                    <HStack>
                      <Text fontWeight={600} fontSize={'sm'}>
                        Image
                      </Text>
                      <IconButton
                        aria-label="Edit"
                        size={'xs'}
                        rounded={'full'}
                        onClick={setIsEditingImage.toggle}
                        variant="outline"
                        icon={isEditingImage ? <FaTimes /> : <HiPencil />}
                      />
                    </HStack>
                    {isEditingImage ? (
                      <>
                        <FilePicker
                          setPreviews={urls => setImagePreview(urls[0])}
                          setFiles={files =>
                            formMethods.setValue('image', files[0])
                          }
                          onLoad={() => {
                            setIsEditingImage.off()
                            handleSave('image')
                          }}
                          height={'auto'}
                        />
                        <Spacer />
                        <HStack>
                          <Button
                            colorScheme="primary"
                            onClick={() => {
                              setIsEditingImage.off()
                              handleSave('image')
                            }}
                          >
                            Save
                          </Button>
                        </HStack>
                      </>
                    ) : (
                      <Stack>
                        {(imagePreview || hashtagPost.image) && (
                          <WImage
                            src={
                              (imagePreview || hashtagPost.image) as
                                | string
                                | UploadFile
                            }
                            alt={hashtagPost.title}
                          />
                        )}
                      </Stack>
                    )}
                  </Stack>
                  <Stack direction={'row'} spacing={{ base: 2, lg: 4 }}>
                    <ButtonGroup alignSelf="end">
                      <Button
                        isDisabled={postApprovalStatus === 'approved'}
                        onClick={handleApprove}
                        colorScheme="primary"
                        leftIcon={<HiOutlineCheck />}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={
                          hashtagPost.publishedAt
                            ? handleUnPublish
                            : handlePublish
                        }
                        colorScheme="primary"
                        leftIcon={
                          hashtagPost.publishedAt ? (
                            <MdOutlineUnpublished />
                          ) : (
                            <MdOutlinePublish />
                          )
                        }
                      >
                        {hashtagPost.publishedAt ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        onClick={handleDelete}
                        colorScheme="red"
                        leftIcon={<HiOutlineX />}
                      >
                        Delete
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
              </Stack>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
