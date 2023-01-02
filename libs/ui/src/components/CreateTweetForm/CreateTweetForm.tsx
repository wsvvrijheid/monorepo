import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
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
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FiArrowUpRight } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import stringSimilarity from 'string-similarity'
import * as yup from 'yup'

import { ModelSelect } from '../../admin/ModelForm/ModelSelect'
import { FilePicker } from '../FilePicker'
import { FormItem } from '../FormItem'
import { CreateTweetFormProps } from './types'

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
  onSubmit,
  isOpen,
  onClose,
  originalTweet,
}) => {
  const TWEET_LENGTH = 280
  const SIMILARITY_LIMIT = 60

  const [similarity, setSimilarity] = useState(0)

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
    defaultValues: {
      text: '',
      mentions: [],
    },
  })

  const [text, mentions] = watch(['text', 'mentions'])

  console.log('mentions', mentions)

  const handleFiles = (files: File[]) => {
    setValue('image', files[0])
  }

  useEffect(() => {
    const similarity =
      stringSimilarity.compareTwoStrings(
        text.toLowerCase(),
        originalTweet.text.toLowerCase(),
      ) * 100
    setSimilarity(similarity)
  }, [text, originalTweet.text, setValue])

  const onSubmitHandler = (data: FormFieldValues) => {
    const mentions = data.mentions?.map(mention => mention.value) || []
    onSubmit(
      data.text,
      originalTweet,
      mentions as unknown as number[],
      data.image,
    )
  }

  const closeModal = () => {
    reset()
    onClose()
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
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <Stack>
                <FormLabel fontWeight={600}>Original Tweet</FormLabel>

                <Text w={'full'}>{originalTweet.text}</Text>
                <FormItem<FormFieldValues>
                  as={Textarea}
                  name="text"
                  label="New Tweet"
                  register={register}
                  errors={errors}
                  isRequired
                />

                <ModelSelect
                  isMulti
                  url="api/mentions"
                  control={control as any}
                  name="mention"
                  label="Mention"
                  errors={errors}
                />
                {/* TODO 
                ADD MENTION
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
                <Divider />
                <Stack>
                  <Text fontWeight={600}>Add Image(s)</Text>
                  <FilePicker setFiles={handleFiles} />
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
                  colorScheme="primary"
                  leftIcon={<FiArrowUpRight />}
                  disabled={similarity > SIMILARITY_LIMIT}
                >
                  Recommend
                </Button>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
