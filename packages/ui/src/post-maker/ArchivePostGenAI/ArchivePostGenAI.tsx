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
  Text,
  Textarea,
  ThemeTypings,
} from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaStop, FaTrash } from 'react-icons/fa6'
import { RiAiGenerate } from 'react-icons/ri'

import { StrapiLocale } from '@fc/types'
import { toastMessage } from '@fc/utils'

type ArchivePostGenAIProps = {
  archiveContentId: number
  content?: string
  onSuccess?: (data: GeneratedArchiveContentPost[]) => void
  initialPosts?: GeneratedArchiveContentPost[]
  colorScheme?: ThemeTypings['colorSchemes']
}

type GeneratedArchiveContentPost = {
  description: string
  sentences: string[]
}

const LANGUAGE_NAMES: Record<StrapiLocale, string> = {
  en: 'English',
  nl: 'Nederlands',
  tr: 'Türkçe',
}

export const ArchivePostGenAI = ({
  archiveContentId,
  content,
  onSuccess,
  initialPosts,
  colorScheme = 'blue',
}: ArchivePostGenAIProps) => {
  const { t } = useTranslation()
  const [generatedArchiveContentPosts, setGeneratedArchiveContentPosts] =
    useState<GeneratedArchiveContentPost[]>(initialPosts || [])
  const [numberOfDescriptions, setNumberOfDescriptions] = useState<number>(5)
  const [numberOfSentences, setNumberOfSentences] = useState<number>(5)
  const [charLimitOfDescriptions, setCharLimitOfDescriptions] =
    useState<number>()
  const [charLimitOfSentences, setCharLimitOfSentences] = useState<number>()

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
    api: '/api/route-archive-content-post-gen',
    initialInput: content,
    body: {
      numberOfDescriptions,
      numberOfSentences,
      charLimitOfDescriptions,
      charLimitOfSentences,
      language,
    },
    onFinish(prompt: string, completion: string) {
      const parsedCompletion = JSON.parse(completion)
      setGeneratedArchiveContentPosts(parsedCompletion)
      onSuccess?.(parsedCompletion)
    },
    onError() {
      toastMessage('Error', t('contact.form.failed'), 'error')
    },
  })

  const handleClear = () => {
    confirm('Are you sure you want to clear?') &&
      setGeneratedArchiveContentPosts([])
  }

  return (
    <Stack
      spacing={4}
      p={{ base: 4, lg: 8 }}
      bg={`${colorScheme}.100`}
      borderWidth={2}
      borderColor={`${colorScheme}.500`}
      rounded={'md'}
    >
      <Heading colorScheme={colorScheme}>Post Generator</Heading>
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
                Number of Caps Content
              </FormLabel>
              <NumberInput
                step={1}
                min={0}
                max={40}
                defaultValue={5}
                onChange={(a, b) => setNumberOfDescriptions(b)}
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
                Number of Posts
              </FormLabel>
              <NumberInput
                step={1}
                min={0}
                max={40}
                defaultValue={5}
                onChange={(a, b) => setNumberOfSentences(b)}
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
                Character Limit (Caps)
              </FormLabel>
              <NumberInput
                step={10}
                min={80}
                max={200}
                defaultValue={150}
                onChange={(a, b) => setCharLimitOfDescriptions(b)}
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
                Character Limit (Posts)
              </FormLabel>
              <NumberInput
                step={10}
                min={100}
                max={200}
                defaultValue={150}
                onChange={(a, b) => setCharLimitOfSentences(b)}
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
              colorScheme={colorScheme}
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
            {generatedArchiveContentPosts?.length &&
              generatedArchiveContentPosts?.length > 0 && (
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
        <Stack spacing={4} p={4}>
          {generatedArchiveContentPosts?.map(
            (postObject: GeneratedArchiveContentPost, idx: number) => {
              return (
                <Stack key={`${archiveContentId}-desc-${idx}`}>
                  <Text noOfLines={1} as="b">
                    {postObject?.description}
                  </Text>
                  <ul>
                    {postObject?.sentences?.map(
                      (sentence: string, idx: number) => {
                        return (
                          <li key={`${archiveContentId}-sent-${idx}`}>
                            {sentence}
                          </li>
                        )
                      },
                    )}
                  </ul>
                </Stack>
              )
            },
          )}
        </Stack>
      )}
    </Stack>
  )
}
