import { useMemo } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Mention, Post, Tweet } from '@wsvvrijheid/types'
import { useForm, FieldErrorsImpl } from 'react-hook-form'
import { FiArrowUpRight } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import stringSimilarity from 'string-similarity'
import * as yup from 'yup'

import { CreateTweetFormProps } from './types'
import { ModelCreateModal } from '../../admin'
import { ModelSelect } from '../../admin/ModelForm/ModelSelect'
import { TweetContent } from '../../admin/TweetContent'
import { postFields, postSchema } from '../../data'
import { useFileFromUrl } from '../../hooks'
import { FormItem } from '../FormItem'

const schema = yup.object({
  text: yup.string().required('Title is required'),
  image: yup.mixed(),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
})

type FormFieldValues = yup.InferType<typeof schema>

export const CreateTweetForm: React.FC<CreateTweetFormProps> = ({
  isOpen,
  onClose,
  originalTweet,
  isNews,
}) => {
  const TWEET_LENGTH = 280
  const SIMILARITY_LIMIT = 60

  const [isChangingImage, setIsChangingImage] = useBoolean(false)

  const imageFile = useFileFromUrl(originalTweet?.image)
  const { token } = useAuthSelector()

  const { mutateAsync } = useRecommendTweet()

  if (isNews) {
    originalTweet = { text: originalTweet.text } as Tweet
  }

  const defaultValues = {
    text: '',
    image: imageFile,
    mentions: [],
  }

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: defaultValues,
  })

  // We don't need to upload the same image as the original tweet
  // useEffect(() => {
  //   if (imageFile) {
  //     setValue('image', imageFile)
  //   }
  // }, [imageFile, setValue, originalTweet?.image])

  const [text, image] = watch(['text', 'image'])

  const newPost = {
    description: text,
    content: text,
    image: { url: originalTweet?.image },
  } as Post

  const similarity = useMemo(() => {
    if (!text || !originalTweet.text) return 0

    return (
      stringSimilarity.compareTwoStrings(
        text.toLowerCase(),
        originalTweet.text.toLowerCase() || '',
      ) * 100
    )
  }, [text, originalTweet.text])

  const closeModal = () => {
    reset()
    onClose()
  }

  const handleRecommend = async (data: FormFieldValues) => {
    const mentions = data.mentions?.map(mention => Number(mention.value)) || []

    await mutateAsync({
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      text: data.text,
      mentions,
      image,
      token: token as string,
    })

    closeModal()
  }

  return (
    <Box>
      <Modal
        size="4xl"
        onClose={closeModal}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalHeader>
            <Text color={'primary.500'} fontWeight={'bold'} w={'full'}>
              Create Tweet
            </Text>
          </ModalHeader>
          <ModalBody>
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleRecommend)}
            >
              <Stack>
                <FormLabel fontWeight={600}>Original Tweet</FormLabel>
                <TweetContent
                  horizontal
                  tweet={originalTweet as Tweet}
                  isChangingImage={isChangingImage}
                  setIsChangingImage={setIsChangingImage}
                  setValue={setValue}
                />
                <FormItem<FormFieldValues>
                  as={Textarea}
                  name="text"
                  label="New Tweet"
                  register={register}
                  errors={errors as FieldErrorsImpl<FormFieldValues>}
                  isRequired
                />

                <ModelSelect<Mention>
                  isMulti
                  url="api/mentions"
                  control={control as any}
                  name="mentions"
                  label="Mention"
                  errors={errors}
                />
                {/* TODO 
                ADD HASHTAG
                */}
                {/* plagiarism ................*/}
                <Stack>
                  <HStack>
                    <Text fontSize="md" fontWeight={600}>
                      Plagiarism
                    </Text>
                    <Text
                      color={text?.length >= TWEET_LENGTH ? 'red' : 'black'}
                    >
                      {text?.length}/280
                    </Text>
                  </HStack>

                  <Progress
                    colorScheme={
                      similarity > SIMILARITY_LIMIT ? 'red' : 'green'
                    }
                    size="lg"
                    value={similarity}
                  />
                  <Text fontSize="xs" color={'gray.500'} w={'full'}>
                    *The Lower is better
                  </Text>
                </Stack>
              </Stack>
              <ButtonGroup alignSelf="end">
                <Button
                  bg={'transparent'}
                  mr={3}
                  leftIcon={<GrFormClose />}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="purple"
                  leftIcon={<FiArrowUpRight />}
                  disabled={similarity > SIMILARITY_LIMIT}
                >
                  Recommend
                </Button>
                <ModelCreateModal<Post>
                  title="Create Post"
                  url="api/posts"
                  schema={postSchema}
                  fields={postFields}
                  model={newPost}
                >
                  Create Post
                </ModelCreateModal>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
