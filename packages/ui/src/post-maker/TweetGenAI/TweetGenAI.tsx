import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Stack,
  Switch,
  Textarea,
} from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaStop, FaTrash } from 'react-icons/fa6'
import { RiAiGenerate } from 'react-icons/ri'

import { StrapiLocale } from '@fc/types'
import { toastMessage } from '@fc/utils'

import { PostSentenceCreator } from '../../components/PostSentenceCreator'

type TweetGenAIProps = {
  postId: number
  hashtagId: number
  content?: string
}

const LANGUAGE_NAMES: Record<StrapiLocale, string> = {
  en: 'English',
  nl: 'Nederlands',
  tr: 'Türkçe',
}

export const TweetGenAI = ({ postId, hashtagId, content }: TweetGenAIProps) => {
  const { t } = useTranslation()
  const [generatedPosts, setGeneratedPosts] = useState<string[]>()
  const [numberOfPosts, setNumberOfPosts] = useState<number>(5)
  const [charLimit, setCharLimit] = useState<number>(150)
  const [useApiInDev, setUseApiInDev] = useState<boolean>(false)

  const { locale } = useRouter()

  const language = LANGUAGE_NAMES[locale]

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/route-tweet-gen',
    initialInput: content,
    body: {
      numberOfPosts,
      charLimit,
      language,
      useApiInDev,
    },
    onFinish(prompt: string, completion: string) {
      setGeneratedPosts(JSON.parse(completion))
    },
    onError(error) {
      if (typeof error?.message === 'string') {
        if (error.message.includes('You exceeded your current quota')) {
          toastMessage('Error', 'You exceeded your current quota', 'error')

          return
        }
      }

      toastMessage('Error', t('contact.form.failed'), 'error')
    },
  })

  const handleClear = () => {
    confirm('Are you sure you want to clear?') && setGeneratedPosts([])
  }

  const handleRemoveGeneratedPost = (indexToRemove: number) => {
    setGeneratedPosts(prevPosts => {
      const newPosts = prevPosts?.filter((_, index) => index !== indexToRemove)

      return newPosts
    })
  }

  return (
    <Stack
      spacing={4}
      p={{ base: 4, lg: 8 }}
      bg={'purple.100'}
      borderBottomWidth={1}
    >
      <Heading color={'purple.500'}>AI Post Generator</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel mb={0} fontSize="sm" fontWeight={600}>
              Content
            </FormLabel>
            <Textarea
              name="prompt"
              placeholder="Enter a content..."
              value={input}
              onChange={handleInputChange}
              required
              rows={6}
              bg={'whiteAlpha.700'}
            />
          </FormControl>
          <HStack
            spacing={{ base: 4, lg: 8 }}
            flexDirection={{ base: 'column', sm: 'row' }}
          >
            <FormControl>
              <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                Number of Posts
              </FormLabel>
              <NumberInput
                step={1}
                min={0}
                max={40}
                defaultValue={5}
                onChange={(a, b) => setNumberOfPosts(b)}
              >
                <NumberInputField bg={'whiteAlpha.700'} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                Character Limit
              </FormLabel>
              <NumberInput
                step={10}
                min={100}
                max={200}
                defaultValue={charLimit}
                value={charLimit}
                onChange={(a, b) => setCharLimit(b)}
              >
                <NumberInputField bg={'whiteAlpha.700'} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>
          <HStack justify={'right'}>
            <FormControl w="auto" display="flex" alignItems="center">
              <FormLabel htmlFor="useApiInDev" mb="0">
                Use API in Dev
              </FormLabel>
              <Switch
                id="useApiInDev"
                isChecked={useApiInDev}
                onChange={e => setUseApiInDev(e.target.checked)}
                colorScheme={'purple'}
              />
            </FormControl>
            <Button
              leftIcon={<RiAiGenerate />}
              disabled={isLoading}
              type="submit"
              colorScheme={'purple'}
            >
              {t('generate')}
            </Button>
            {isLoading && (
              <Button
                leftIcon={<FaStop />}
                type="button"
                onClick={stop}
                colorScheme="gray"
              >
                Stop
              </Button>
            )}
            {generatedPosts?.length && generatedPosts?.length > 0 && (
              <Button
                leftIcon={<FaTrash />}
                type="button"
                onClick={handleClear}
                colorScheme={'red'}
              >
                Clear Results
              </Button>
            )}
          </HStack>
        </Stack>
      </form>
      {isLoading ? (
        <Box p={4}>
          <Progress
            size="xs"
            mb={4}
            isIndeterminate
            colorScheme={'purple'}
            bgColor={'whiteAlpha.700'}
          />
          {completion}
        </Box>
      ) : (
        <Stack spacing={4}>
          {generatedPosts?.map((genPost: string, idx: number) => {
            return (
              <PostSentenceCreator
                key={`${postId}-${idx}`}
                initialContent={genPost}
                hashtagId={hashtagId}
                postId={postId}
                colorScheme={'purple'}
                onSuccess={() => handleRemoveGeneratedPost(idx)}
              />
            )
          })}
        </Stack>
      )}
    </Stack>
  )
}
