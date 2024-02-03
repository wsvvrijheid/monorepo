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

type ArchivePostGenAIProps = {
  archiveContentId: number
  content?: string
}

type GeneratedHashtagPost = {
  description: string
  sentences: string[]
}

const LANGUAGE_NAMES: Record<StrapiLocale, string> = {
  en: 'English',
  nl: 'Nederlands',
  tr: 'Türkçe',
}

export const ArchivePostGenAI = ({ archiveContentId, content }: ArchivePostGenAIProps) => {
  const { t } = useTranslation()
  const [generatedHashtagPosts, setGeneratedHashtagPosts] =
    useState<GeneratedHashtagPost[]>()
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
      setGeneratedHashtagPosts(JSON.parse(completion))
    },
    onError() {
      toastMessage('Error', t('contact.form.failed'), 'error')
    },
  })

  const handleClear = () => {
    confirm('Are you sure you want to clear?') && setGeneratedHashtagPosts([])
  }

  return (
    <Stack
      spacing={4}
      p={{ base: 4, lg: 8 }}
      bg={'blue.100'}
      borderBottomWidth={1}
    >
      <Heading color={'blue.500'}>Archive Content Post Generator</Heading>
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
                Number of Descriptions
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
                Number of Sentences
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
                Character Limit (Description)
              </FormLabel>
              <NumberInput
                step={10}
                min={50}
                max={200}
                defaultValue={80}
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
                Character Limit (Sentences)
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
              colorScheme={'facebook'}
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
            {generatedHashtagPosts?.length &&
              generatedHashtagPosts?.length > 0 && (
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
          {generatedHashtagPosts?.map(
            (postObject: GeneratedHashtagPost, idx: number) => {
              return (
                <Stack key={`${archiveContentId}-desc-${idx}`}>
                  <p>{postObject?.description}</p>
                  <ul>
                    {postObject?.sentences?.map(
                      (sentence: string, idx: number) => {
                        return (
                          <li key={`${archiveContentId}-sent-${idx}`}>{sentence}</li>
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
