// import { FC, useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import slugify from '@sindresorhus/slugify'
import { useGetMentions, useUpdateHashtagMutation } from '@wsvvrijheid/services'
import { StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { HiOutlineX, HiPencil } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdOutlinePublish, MdOutlineUnpublished } from 'react-icons/md'
import * as yup from 'yup'

import {
  EditableFormItem,
  FilePicker,
  WConfirm,
  WConfirmProps,
  WImage,
  WSelect,
} from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { MentionItem } from './MentionItem'
import {
  CreateMainHashtagFormFieldValues,
  MainHashtagDetailModalProps,
} from './types'

export const MainHashtagDetailModal: FC<MainHashtagDetailModalProps> = ({
  localizeHashtag,
  isOpen,
  onDelete,
  onPublish,
  unPublish,
  onClose,
}) => {
  const { locale } = useRouter()

  const [isEditingMention, setIsEditingMention] = useBoolean(false)
  const [isEditingImage, setIsEditingImage] = useBoolean(false)
  const [imagePreview, setImagePreview] = useState<string>()

  const currentMentions = useGetMentions()

  const confirmDisclosure = useDisclosure()
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtag: yup.string(),
    hashtagExtra: yup.string(),
    date: yup.string().required('Date is required'),
    mentions: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
  })

  const mainHashtag = localizeHashtag[locale as StrapiLocale]

  const formMethods = useForm<CreateMainHashtagFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ...mainHashtag,
      hashtagExtra: mainHashtag.hashtagExtra || undefined,
      mentions:
        mainHashtag.mentions?.map(m => ({
          label: m.username,
          value: m.id.toString(),
        })) || [],
    },
  })

  const closeForm = () => {
    onClose()
  }

  const { mutateAsync: updateHashtag } = useUpdateHashtagMutation()

  const [
    title,
    description,
    content,
    hashtag,
    hashtagExtra,
    date,
    image,
    mentions,
  ] = formMethods.watch([
    'title',
    'description',
    'content',
    'hashtag',
    'hashtagExtra',
    'date',
    'image',
    'mentions',
  ])

  const fields = [
    title,
    description,
    content,
    hashtag,
    hashtagExtra,
    date,
    image,
    mentions,
  ]

  /* save fields*/

  const handleSave = async (field: string) => {
    const fieldIndex = [
      'title',
      'description',
      'content',
      'hashtag',
      'hashtagExtra',
      'date',
      'image',
      'mentions',
    ].indexOf(field)

    if (field === 'mentions') {
      const mentions = formMethods.watch('mentions')
      const mentionsIds = mentions?.map(m => parseInt(m.value))
      return updateHashtag({
        id: mainHashtag.id,
        mentions: mentionsIds,
      })
    } else if (field === 'title') {
      const slug = slugify(title)
      return updateHashtag({
        id: mainHashtag.id,
        title,
        slug,
      })
    } else {
      return updateHashtag({
        id: mainHashtag.id,
        [field]: fields[fieldIndex],
      })
    }
  }

  const handleRemoveItem = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      isWarning: true,
      title: 'Remove Mention',
      description: 'Are you sure you want to remove this mention?',
      buttonText: 'Remove',
      onConfirm: async () => {
        const newMentions = mentions?.filter(m => parseInt(m.value) !== id)

        formMethods.setValue('mentions', newMentions)
        updateHashtag({
          id: mainHashtag.id,
          mentions: newMentions?.map(m => parseInt(m.value)),
        })
      },
    })
  }

  const handlePublish = () => onPublish(mainHashtag.id)
  const handleUnPublish = () => unPublish(mainHashtag.id)
  const handleDelete = () => onDelete(mainHashtag.id)

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
          <ModalHeader color={'primary.500'}>Main Hashtag Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pos="relative" py={6}>
            {/* MAIN HASHTAG DETAILS */}
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

                  <HStack>
                    <FormControl isRequired>
                      <FormLabel>Locale</FormLabel>
                      <LanguageSwitcher />
                    </FormControl>
                    {/*date ========== */}
                    <Stack align="start" justify={'start'} w="full">
                      <EditableFormItem
                        name="date"
                        label="Date"
                        isRequired
                        onSave={() => handleSave('date')}
                        type="datetime-local"
                      />
                    </Stack>
                  </HStack>
                  <HStack>
                    {/* hashtag*/}
                    <Stack align="start" justify={'start'} w="full">
                      <EditableFormItem
                        name="hashtag"
                        label="Hashtag"
                        isRequired
                        onSave={() => handleSave('hashtag')}
                      />
                    </Stack>
                    {/* hashtagextra =======*/}
                    <Stack align="start" justify={'start'} w="full">
                      <EditableFormItem
                        name="hashtagExtra"
                        label="Hashtag Extra"
                        isRequired
                        onSave={() => handleSave('hashtagExtra')}
                      />
                    </Stack>
                  </HStack>
                  {/* total posts count*/}
                  <Text color={'black'} fontWeight={'bold'} alignSelf="start">
                    Total Post: {mainHashtag.posts?.length}
                  </Text>
                </Stack>
                {/* RIGHT SIDE */}
                <Stack flex={1} spacing={4}>
                  {/* Mentions ===*/}
                  <Stack>
                    <HStack>
                      <Text fontWeight={600} fontSize={'sm'}>
                        Mentions
                      </Text>
                      <IconButton
                        aria-label="Edit"
                        size={'xs'}
                        rounded={'full'}
                        onClick={setIsEditingMention.toggle}
                        variant="outline"
                        icon={isEditingMention ? <FaTimes /> : <HiPencil />}
                      />
                    </HStack>
                    {isEditingMention ? (
                      <WSelect<CreateMainHashtagFormFieldValues>
                        isMulti
                        name="mentions"
                        control={formMethods.control}
                        errors={formMethods.formState.errors}
                        options={
                          currentMentions.data?.map(c => ({
                            value: c.id.toString(),
                            label: `@${c.username}`,
                          })) || []
                        }
                        onBlur={() => {
                          setIsEditingMention.off()
                          handleSave('mentions')
                        }}
                      />
                    ) : (
                      <Stack justify={'stretch'}>
                        {mainHashtag.mentions?.map(mention => {
                          return (
                            <MentionItem
                              mention={mention}
                              onRemoveItem={handleRemoveItem}
                            />
                          )
                        })}
                      </Stack>
                    )}
                  </Stack>

                  {/* image ==========*/}
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
                        {(imagePreview || mainHashtag.image) && (
                          <WImage
                            src={
                              (imagePreview || mainHashtag.image) as
                                | string
                                | UploadFile
                            }
                            alt={mainHashtag.title}
                          />
                        )}
                      </Stack>
                    )}
                  </Stack>
                  <ButtonGroup alignSelf="end">
                    <Button
                      onClick={
                        mainHashtag.publishedAt
                          ? handleUnPublish
                          : handlePublish
                      }
                      colorScheme="primary"
                      leftIcon={
                        mainHashtag.publishedAt ? (
                          <MdOutlineUnpublished />
                        ) : (
                          <MdOutlinePublish />
                        )
                      }
                    >
                      {mainHashtag.publishedAt ? 'Unpublish' : 'Publish'}
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
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
