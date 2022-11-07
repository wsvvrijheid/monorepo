// import { FC, useEffect, useState } from 'react'
import { FC, useEffect, useRef, useState } from 'react'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Textarea,
  IconButton,
  Input,
  Spacer,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import * as dateFns from 'date-fns'
import { useForm } from 'react-hook-form'
import { HiOutlineX, HiPencil } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdOutlinePublish, MdOutlineUnpublished } from 'react-icons/md'
import * as yup from 'yup'

import {
  FilePicker,
  WConfirm,
  WConfirmProps,
  WImage,
  WSelect,
} from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { EditButtons } from './EditButtons'
import { MentionItem } from './MentionItem'
import { CreateMainHashtagFormFieldValues, MainHashtagTypes } from './types'

export const MainHashtagDetailModal: FC<MainHashtagTypes> = ({
  mainhashtagId,
  mainhashtagTitle,
  mainhashtagDescription,
  mainhashtagContent,
  mainhashtagDate,
  mainhashtagHashtag,
  mainhashtagHashtagExtra,
  mentions,
  posts,
  mainhashtagMentions,
  mainhashtagImage,
  mainhashtagPublishedAt,
  isOpen,
  onDelete,
  onPublish,
  unPublish,
  onClose,
  onSave,
}) => {
  const [locale, setLocale] = useState<StrapiLocale>('en')

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDesciption, setIsEditingDesciption] = useState(false)
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [isEditingHashtag, setIsEditingHashtag] = useState(false)
  const [isEditingHashtagExtra, setIsEditingHashtagExtra] = useState(false)
  const [isEditingMention, setIsEditingMention] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)

  const [title, setTitle] = useState(mainhashtagTitle)
  const [description, setDescription] = useState(mainhashtagDescription)
  const [content, setContent] = useState(mainhashtagContent)
  const [newMentions, setNewMentions] = useState(mainhashtagMentions)
  const [date, setDate] = useState(mainhashtagDate)
  const [hashtag, setHashtag] = useState(mainhashtagHashtag)
  const [hashtagExtra, setHashtagExtra] = useState(mainhashtagHashtagExtra)
  const [images, setImages] = useState<Blob[]>(mainhashtagImage)

  const confirmDisclosure = useDisclosure()
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const schema = yup.object({
    mention: yup.string(),
  })

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateMainHashtagFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  //   //update field states
  useEffect(() => {
    setDescription(mainhashtagDescription)
    setTitle(mainhashtagTitle)
    setContent(mainhashtagContent)
    setNewMentions(mainhashtagMentions)
    setHashtag(mainhashtagHashtag)
    setHashtagExtra(mainhashtagHashtagExtra)
    setImages(mainhashtagImage)
  }, [
    mainhashtagDescription,
    mainhashtagTitle,
    mainhashtagContent,
    mainhashtagMentions,
    mainhashtagHashtag,
    mainhashtagHashtagExtra,
    mainhashtagImage,
  ])

  useEffect(() => {
    const formattedDate = dateFns.format(
      new Date(mainhashtagDate),
      'dd MMMM yyyy HH:mm',
    )
    setDate(formattedDate)
  }, [mainhashtagDate])

  //set image
  useEffect(() => {
    setImages(mainhashtagImage)
  }, [mainhashtagImage])

  const closeForm = () => {
    onClose()
  }

  /* save fields*/

  const handleSave = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(false)
      onSave(mainhashtagId, description, 'description')
    } else if (data === 'content') {
      setIsEditingContent(false)
      onSave(mainhashtagId, content, 'content')
    } else if (data === 'title') {
      setIsEditingTitle(false)
      onSave(mainhashtagId, title, 'title')
    } else if (data === 'date') {
      const formattedDate = dateFns.format(new Date(date), 'dd MMMM yyyy HH:mm')
      setDate(formattedDate)
      setIsEditingDate(false)
      onSave(mainhashtagId, date, 'date')
    } else if (data === 'hashtag') {
      setIsEditingHashtag(false)
      onSave(mainhashtagId, hashtag, 'hashtag')
    } else if (data === 'hashtagExtra') {
      setIsEditingHashtagExtra(false)
      onSave(mainhashtagId, hashtagExtra, 'hashtagExtra')
    } else if (data === 'mentions') {
      setIsEditingMention(false)
      const m = watch('mentions')

      if (m) {
        const newMentions = mentions?.filter(
          (mention, index) => mention?.id === Number(m[index]?.value),
        )
        setNewMentions(newMentions)
        console.log('new mention ======', newMentions)
        onSave(mainhashtagId, newMentions, 'mentions')
      }
    } else if (data === 'image') {
      setIsEditingImage(false)
      const image = images[0]
      onSave(mainhashtagId, image, 'image')
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
        const newMentions = mainhashtagMentions?.filter(
          mention => mention.id !== id,
        )
        setNewMentions(newMentions)
        onSave(mainhashtagId, newMentions, 'mentions')
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  /* cancel edit fields*/
  const cancelEdit = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(false)
    } else if (data === 'content') {
      setIsEditingContent(false)
    } else if (data === 'title') {
      setIsEditingTitle(false)
    } else if (data === 'date') {
      setIsEditingDate(false)
    } else if (data === 'hashtag') {
      setIsEditingHashtag(false)
    } else if (data === 'hashtagExtra') {
      setIsEditingHashtagExtra(false)
    } else if (data === 'mentions') {
      setIsEditingMention(false)
    } else if (data === 'image') {
      setIsEditingImage(false)
    }
  }
  /* update fields*/
  const handleUpdate = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(true)
    } else if (data === 'content') {
      setIsEditingContent(true)
    } else if (data === 'title') {
      setIsEditingTitle(true)
    } else if (data === 'date') {
      setIsEditingDate(true)
    } else if (data === 'hashtag') {
      setIsEditingHashtag(true)
    } else if (data === 'hashtagExtra') {
      setIsEditingHashtagExtra(true)
    } else if (data === 'mentions') {
      setIsEditingMention(true)
    } else if (data === 'image') {
      setIsEditingImage(true)
    }
  }
  const handlePublish = () => onPublish(mainhashtagId)
  const handleUnPublish = () => unPublish(mainhashtagId)
  const handleDelete = () => onDelete(mainhashtagId)

  console.log('mentions >>>', mainhashtagMentions)
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
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
              as="form"
            >
              {/* LEFT SIDE */}
              <Stack flex={1} spacing={4}>
                {/*title ========== */}
                <Stack align="start" justify={'start'} w="full">
                  <Text color={'black'} fontWeight={'bold'}>
                    Title
                  </Text>
                  {isEditingTitle ? (
                    <Stack>
                      <Textarea
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                      />
                      <EditButtons
                        handleSave={handleSave}
                        cancelEdit={cancelEdit}
                        task="title"
                      />
                    </Stack>
                  ) : (
                    <HStack>
                      <Text>{title}</Text>
                      <Button
                        as={IconButton}
                        onClick={() => handleUpdate('title')}
                        variant="ghost"
                        colorScheme="primary"
                        icon={<HiPencil />}
                      ></Button>
                    </HStack>
                  )}
                </Stack>
                {/*description ========== */}
                <Stack align="start" justify={'start'} w="full">
                  <Text color={'black'} fontWeight={'bold'}>
                    Description
                  </Text>
                  {isEditingDesciption ? (
                    <Stack w="full">
                      <Textarea
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                      />
                      <EditButtons
                        handleSave={handleSave}
                        cancelEdit={cancelEdit}
                        task="description"
                      />
                    </Stack>
                  ) : (
                    <HStack>
                      <Text>{description}</Text>
                      <Button
                        as={IconButton}
                        onClick={() => handleUpdate('description')}
                        variant="ghost"
                        colorScheme="primary"
                        icon={<HiPencil />}
                      ></Button>
                    </HStack>
                  )}
                </Stack>
                {/*content ========== */}

                <Stack align="start" justify={'start'} w="full">
                  <Text color={'black'} fontWeight={'bold'}>
                    Content
                  </Text>
                  {isEditingContent ? (
                    <Stack w="full">
                      <Textarea
                        onChange={e => setContent(e.target.value)}
                        value={content}
                      />
                      <EditButtons
                        handleSave={handleSave}
                        cancelEdit={cancelEdit}
                        task="content"
                      />
                    </Stack>
                  ) : (
                    <HStack>
                      <Text>{content}</Text>
                      <Button
                        as={IconButton}
                        onClick={() => handleUpdate('content')}
                        variant="ghost"
                        colorScheme="primary"
                        icon={<HiPencil />}
                      ></Button>
                    </HStack>
                  )}
                </Stack>
                {/*locales ========== */}

                <HStack>
                  <FormControl isRequired>
                    <FormLabel>Locale</FormLabel>
                    <LanguageSwitcher
                      defaultLocale={locale as StrapiLocale}
                      onLanguageSwitch={setLocale}
                    />
                  </FormControl>
                  {/*date ========== */}
                  <Stack align="start" justify={'start'} w="full">
                    <Text color={'black'} fontWeight={'bold'}>
                      Date
                    </Text>
                    {isEditingDate ? (
                      <Stack w="full">
                        <Input
                          onChange={e => setDate(e.target.value)}
                          value={date}
                          placeholder="Select Date and Time"
                          size="md"
                          type="datetime-local"
                        />
                        <EditButtons
                          handleSave={handleSave}
                          cancelEdit={cancelEdit}
                          task="date"
                        />
                      </Stack>
                    ) : (
                      <HStack>
                        <Text typeof="date">{date}</Text>
                        <Button
                          as={IconButton}
                          onClick={() => handleUpdate('date')}
                          variant="ghost"
                          colorScheme="primary"
                          icon={<HiPencil />}
                        ></Button>
                      </HStack>
                    )}
                  </Stack>
                </HStack>
                <HStack>
                  {/* hashtag*/}
                  <Stack align="start" justify={'start'} w="full">
                    <Text color={'black'} fontWeight={'bold'}>
                      Hashtag
                    </Text>
                    {isEditingHashtag && hashtag ? (
                      <Stack w="full">
                        <Textarea
                          onChange={e => setHashtag(e.target.value)}
                          value={hashtag}
                        />
                        <EditButtons
                          handleSave={handleSave}
                          cancelEdit={cancelEdit}
                          task="hashtag"
                        />
                      </Stack>
                    ) : (
                      <HStack>
                        <Text>{hashtag}</Text>
                        <Button
                          as={IconButton}
                          onClick={() => handleUpdate('hashtag')}
                          variant="ghost"
                          colorScheme="primary"
                          icon={<HiPencil />}
                        ></Button>
                      </HStack>
                    )}
                  </Stack>
                  {/* hashtagextra =======*/}
                  <Stack align="start" justify={'start'} w="full">
                    <Text color={'black'} fontWeight={'bold'}>
                      Hashtag Extra
                    </Text>
                    {isEditingHashtagExtra ? (
                      <Stack w="full">
                        <Textarea
                          onChange={e => setHashtagExtra(e.target.value)}
                          value={hashtagExtra}
                        />
                        <EditButtons
                          handleSave={handleSave}
                          cancelEdit={cancelEdit}
                          task="hashtagExtra"
                        />
                      </Stack>
                    ) : (
                      <HStack>
                        <Text>{hashtagExtra}</Text>
                        <Button
                          as={IconButton}
                          onClick={() => handleUpdate('hashtagExtra')}
                          variant="ghost"
                          colorScheme="primary"
                          icon={<HiPencil />}
                        ></Button>
                      </HStack>
                    )}
                  </Stack>
                </HStack>
                {/* total posts count*/}
                <Text color={'black'} fontWeight={'bold'} alignSelf="start">
                  Total Post: {posts?.length}
                </Text>
              </Stack>
              {/* RIGHT SIDE */}
              <Stack flex={1} spacing={4}>
                {/* Mentions ===*/}

                {isEditingMention ? (
                  <Stack w="full">
                    <WSelect
                      isMulti
                      name="mentions"
                      label="Mentions"
                      register={register}
                      control={control}
                      errors={errors}
                      options={
                        mentions?.map(c => ({
                          value: c.id,
                          label: `@${c.username}`,
                        })) || []
                      }
                    />
                    <EditButtons
                      handleSave={handleSave}
                      cancelEdit={cancelEdit}
                      task="mentions"
                    />
                  </Stack>
                ) : (
                  <Stack justifySelf={'end'}>
                    <HStack>
                      <Text color={'black'} fontWeight={'bold'}>
                        Mentions
                      </Text>
                      <Button
                        as={IconButton}
                        onClick={() => handleUpdate('mentions')}
                        variant="ghost"
                        colorScheme="primary"
                        icon={<HiPencil />}
                      ></Button>
                    </HStack>
                    {newMentions?.map(mention => {
                      return (
                        <MentionItem
                          mention={mention}
                          onRemoveItem={handleRemoveItem}
                        />
                      )
                    })}
                  </Stack>
                )}

                {/* image ==========*/}
                {isEditingImage ? (
                  <>
                    <FilePicker setFiles={setImages} />
                    <Spacer />
                    <EditButtons
                      handleSave={handleSave}
                      cancelEdit={cancelEdit}
                      task="image"
                    />
                  </>
                ) : (
                  <HStack>
                    {images && (
                      <WImage
                        src={mainhashtagImage?.url as UploadFile}
                        alt={mainhashtagTitle}
                      />
                    )}
                    <Button
                      as={IconButton}
                      onClick={() => handleUpdate('image')}
                      variant="ghost"
                      colorScheme="primary"
                      icon={<HiPencil />}
                      justify={'start'}
                    ></Button>
                  </HStack>
                )}
                <ButtonGroup alignSelf="end">
                  <Button
                    onClick={
                      mainhashtagPublishedAt ? handleUnPublish : handlePublish
                    }
                    colorScheme="primary"
                    rightIcon={
                      mainhashtagPublishedAt ? (
                        <MdOutlineUnpublished />
                      ) : (
                        <MdOutlinePublish />
                      )
                    }
                  >
                    {mainhashtagPublishedAt ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    onClick={handleDelete}
                    colorScheme="red"
                    rightIcon={<HiOutlineX />}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
