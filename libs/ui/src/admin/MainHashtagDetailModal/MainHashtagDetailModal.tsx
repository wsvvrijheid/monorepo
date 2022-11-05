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
import { StrapiLocale } from '@wsvvrijheid/types'
import * as dateFns from 'date-fns'
import { HiPencil } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

import { WImage } from '../../components'
// import { FormItem, FilePicker, WSelect } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { MainHashtagTypes } from './types'

export const MainHashtagDetailModal: FC<MainHashtagTypes> = ({
  mainhashtagId,
  mainhashtagTitle,
  mainhashtagDescription,
  mainhashtagContent,
  mainhashtagDate,
  mainhashtagHashtag,
  mainhashtagHashtagExtra,
  mentions,
  mainhashtagImage,
  isOpen,
  // onDelete,

  // onPublish,
  // unPublish,
  onClose,
  onSave,
}) => {
  const [locale, setLocale] = useState<StrapiLocale>('en')
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const [isEditingDesciption, setIsEditingDesciption] = useState(false)
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [isEditingHashtag, setIsEditingHashtag] = useState(false)
  const [isEditingHashtagextra, setIsEditingHashtagextra] = useState(false)
  const [title, setTitle] = useState(mainhashtagTitle)

  const [description, setDescription] = useState(mainhashtagDescription)
  const [content, setContent] = useState(mainhashtagContent)

  const [date, setDate] = useState(mainhashtagDate)
  const [hashtag, setHashtag] = useState(mainhashtagHashtag)
  const [hashtagextra, setHashtagextra] = useState(mainhashtagHashtagExtra)
  const cancelRef = useRef<HTMLButtonElement>(null)

  //   //set new description and content
  useEffect(() => {
    const formattedDate = dateFns.format(
      new Date(mainhashtagDate),
      'dd MMMM yyyy HH:mm',
    )
    setDate(formattedDate)
  }, [mainhashtagDate])
  //   useEffect(() => {
  //     setContent(artContent)
  //   }, [artContent])

  const closeForm = () => {
    // resetFileUploader()
    // resetForm()
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
      console.log('date in handle save >>>>>>>>', formattedDate)
      setIsEditingDate(false)
      onSave(mainhashtagId, date, 'date')
    } else if (data === 'hashtag') {
      setIsEditingHashtag(false)
      onSave(mainhashtagId, hashtag, 'hashtag')
    } else if (data === 'hashtagextra') {
      setIsEditingHashtagextra(false)
      onSave(mainhashtagId, hashtagextra, 'hashtagextra')
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
    } else if (data === 'hashtagextra') {
      setIsEditingHashtagextra(true)
    }
  }

  console.log('mentions >>>', mentions)
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

            {/* CREATE FORM */}
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
                      <Stack
                        w="full"
                        // as="form"
                        // onSubmit={data => console.log('data in form', data)}
                      >
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
                    {isEditingHashtagextra ? (
                      <Stack w="full">
                        <Textarea
                          onChange={e => setHashtagextra(e.target.value)}
                          value={hashtagextra}
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('hashtagextra')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Stack align="start" justify={'start'} w="full">
                        <Text color={'black'} fontWeight={'bold'}>
                          Hashtagextra
                        </Text>
                        <HStack>
                          <Text>{hashtagextra}</Text>
                          <Button
                            as={IconButton}
                            onClick={() => handleUpdate('hashtagextra')}
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
                  {/* <FilePicker setFiles={setImages} /> */}
                  {/* current Images*/}
                  {mainhashtagImage && (
                    <WImage
                      src={mainhashtagImage?.url}
                      alt={mainhashtagTitle}
                    />
                  )}
                </Stack>
                <Stack>
                  <Text color={'black'} fontWeight={'bold'}>
                    Mentions
                  </Text>
                  {mentions
                    ? mentions.map(mention => {
                        return <Text>{`@${mention.username}`}</Text>
                      })
                    : ''}
                </Stack>
                {/* <WSelect
                  isMulti
                  name="mentions"
                  label="Mentions"
                  control={control}
                  errors={errors}
                  // TODO: get mentions from API with useQuery
                  // We will improve WSelect later to accept async options
                  options={
                    currentMentions?.data?.map(c => ({
                      value: c.id,
                      label: `@${c.username.toString()}`,
                    })) || []
                  }
                /> */}
                <ButtonGroup alignSelf="end">
                  {/* <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    save
                  </Button> */}
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
