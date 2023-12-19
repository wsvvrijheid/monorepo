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
  Textarea,
} from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaStop, FaTrash } from 'react-icons/fa6'
import { RiAiGenerate } from 'react-icons/ri'

import { StrapiLocale } from '@wsvvrijheid/types'
import { toastMessage } from '@wsvvrijheid/utils'

type TweetGenAIProps = {
  content?: string
}

const LANGUAGE_NAMES: Record<StrapiLocale, string> = {
  en: 'English',
  nl: 'Nederlands',
  tr: 'Türkçe',
}

export const TweetGenAI = ({ content }: TweetGenAIProps) => {
  const { t } = useTranslation()
  const [generatedPosts, setGeneratedPosts] = useState<string[]>()
  const [numberOfPosts, setNumberOfPosts] = useState<number>(5)
  const [charLimit, setCharLimit] = useState<number>()

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
    },
    onFinish(prompt: string, completion: string) {
      setGeneratedPosts(JSON.parse(completion))
    },
    onError() {
      toastMessage('Error', t('contact.form.failed'), 'error')
    },
  })

  const handleClear = () => {
    confirm('Are you sure you want to clear?') && setGeneratedPosts([])
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
                defaultValue={150}
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
            // TODO: Use PostSentenceCreator component
            return (
              <Textarea
                name={`aiPost-${idx}`}
                id={`aiPost-${idx}`}
                key={idx}
                value={genPost}
                onChange={e => console.log(e.target.value)}
                bg={'whiteAlpha.700'}
              />
            )
          })}
        </Stack>
      )}
    </Stack>
  )
}
