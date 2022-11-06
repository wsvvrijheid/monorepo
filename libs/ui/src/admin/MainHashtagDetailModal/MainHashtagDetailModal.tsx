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
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Textarea,
  Flex,
  IconButton,
  Input,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import * as dateFns from 'date-fns'
import { useForm } from 'react-hook-form'
import { HiOutlineX, HiPencil } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdOutlinePublish, MdOutlineUnpublished } from 'react-icons/md'
import * as yup from 'yup'

import { FilePicker, WImage, WSelect } from '../../components'
// import { FormItem, FilePicker, WSelect } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
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
          (mention, index) => Number(m[index]?.value) === mention.id,
        )
        console.log('mentions in onsave>', newMentions)
        setNewMentions(newMentions)
        onSave(mainhashtagId, newMentions, 'mentions')
      }
    } else if (data === 'image') {
      setIsEditingImage(false)
      const image = images[0]
      onSave(mainhashtagId, image, 'image')
      console.log('images', image)
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
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={0} overflow="hidden">
          <ModalCloseButton />
          <ModalBody p={0}>
            {/* {isLoading && (
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
            )} */}

            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              as="form"
            >
              <Stack
                flex={1}
                spacing={4}
                p={{ base: 4, lg: 8 }}
                justify="space-between"
              >
                {/*title ========== */}
                <Flex
                  align="start"
                  justify={'start'}
                  w="full"
                  maxH={'150px'}
                  overflow="auto"
                >
                  {isEditingTitle ? (
                    <Stack w="full">
                      <Textarea
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                      />
                      <Button
                        colorScheme="primary"
                        onClick={() => handleSave('title')}
                        alignSelf="end"
                      >
                        Save
                      </Button>
                    </Stack>
                  ) : (
                    <Stack align="start" justify={'start'} w="full">
                      <Text color={'black'} fontWeight={'bold'}>
                        Title
                      </Text>
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
                    </Stack>
                  )}
                </Flex>
                {/*description ========== */}
                <Flex
                  align="start"
                  justify={'start'}
                  w="full"
                  maxH={'150px'}
                  overflow="auto"
                >
                  {isEditingDesciption ? (
                    <Stack w="full">
                      <Textarea
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                      />
                      <Button
                        colorScheme="primary"
                        onClick={() => handleSave('description')}
                        alignSelf="end"
                      >
                        Save
                      </Button>
                    </Stack>
                  ) : (
                    <Stack align="start" justify={'start'} w="full">
                      <Text color={'black'} fontWeight={'bold'}>
                        Description
                      </Text>
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
                    </Stack>
                  )}
                </Flex>
                {/*content ========== */}
                <Flex
                  align="start"
                  justify={'start'}
                  w="full"
                  maxH={'150px'}
                  overflow="auto"
                >
                  {isEditingContent ? (
                    <Stack w="full">
                      <Textarea
                        onChange={e => setContent(e.target.value)}
                        value={content}
                      />
                      <Button
                        colorScheme="primary"
                        onClick={() => handleSave('content')}
                        alignSelf="end"
                      >
                        Save
                      </Button>
                    </Stack>
                  ) : (
                    <Stack align="start" justify={'start'} w="full">
                      <Text color={'black'} fontWeight={'bold'}>
                        Content
                      </Text>
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
                    </Stack>
                  )}
                </Flex>
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
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'150px'}
                    overflow="auto"
                  >
                    {isEditingDate ? (
                      <Stack w="full">
                        <Input
                          onChange={e => setDate(e.target.value)}
                          value={date}
                          placeholder="Select Date and Time"
                          size="md"
                          type="datetime-local"
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('date')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Stack align="start" justify={'start'} w="full">
                        <Text color={'black'} fontWeight={'bold'}>
                          Date
                        </Text>
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
                      </Stack>
                    )}
                  </Flex>
                </HStack>
                <HStack>
                  {/* hashtag*/}
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'150px'}
                    overflow="auto"
                  >
                    {isEditingHashtag && hashtag ? (
                      <Stack w="full">
                        <Textarea
                          onChange={e => setHashtag(e.target.value)}
                          value={hashtag}
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('hashtag')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Stack align="start" justify={'start'} w="full">
                        <Text color={'black'} fontWeight={'bold'}>
                          Hashtag
                        </Text>
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
                      </Stack>
                    )}
                  </Flex>
                  {/* hashtagextra =======*/}
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'150px'}
                    overflow="auto"
                  >
                    {isEditingHashtagExtra ? (
                      <Stack w="full">
                        <Textarea
                          onChange={e => setHashtagExtra(e.target.value)}
                          value={hashtagExtra}
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('hashtagExtra')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Stack align="start" justify={'start'} w="full">
                        <Text color={'black'} fontWeight={'bold'}>
                          Hashtag Extra
                        </Text>
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
                      </Stack>
                    )}
                  </Flex>
                </HStack>
              </Stack>
              <Stack flex={1}>
                <Stack>
                  {/* image ==========*/}
                  {isEditingImage ? (
                    <>
                      <FilePicker setFiles={setImages} />
                      <Button
                        colorScheme="primary"
                        onClick={() => handleSave('image')}
                        alignSelf="end"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
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
                      ></Button>
                    </>
                  )}
                </Stack>
                <HStack>
                  <Stack>
                    <Text color={'black'} fontWeight={'bold'}>
                      Total Post: {posts?.length}
                    </Text>
                  </Stack>
                  {/* Mentions ===*/}
                  <Stack>
                    {isEditingMention ? (
                      <Stack>
                        <WSelect
                          isMulti
                          name="mentions"
                          label="Mentions"
                          register={register}
                          control={control}
                          errors={errors}
                          // TODO: get mentions from API with useQuery
                          // We will improve WSelect later to accept async options
                          options={
                            mentions?.map(c => ({
                              value: c.id,
                              label: `@${c.username}`,
                            })) || []
                          }
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('mentions')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <>
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
                          return <Text>{`@${mention.username}`}</Text>
                        })}
                      </>
                    )}
                  </Stack>
                </HStack>
                <ButtonGroup alignSelf="end">
                  {/* <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    save
                  </Button> */}
                  <Button
                    onClick={
                      mainhashtagPublishedAt ? handleUnPublish : handlePublish
                    }
                    // variant="ghost"
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
    </Box>
  )
}
