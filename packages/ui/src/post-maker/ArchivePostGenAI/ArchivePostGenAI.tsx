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
  Text,
  Textarea,
  ThemeTypings,
} from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaSave } from 'react-icons/fa'
import { FaStop, FaTrash } from 'react-icons/fa6'
import { RiAiGenerate } from 'react-icons/ri'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { createHashtagSentence } from '@fc/services'
import { PostCreateInput, StrapiLocale } from '@fc/types'
import { sleep, toastMessage } from '@fc/utils'

import { EditablePost } from './EditablePost'
import {
  ArchivePost,
  GeneratedArchiveContentPost,
  useGenPostContext,
} from './GenPostProvider'
import { parseUncomletedPosts } from './parseUncomletedPosts'

type ArchivePostGenAIProps = {
  archiveContentId: number
  content?: string
  referanceLink?: string
  onSuccess?: (data: ArchivePost[]) => void
  initialPosts?: GeneratedArchiveContentPost[]
  colorScheme?: ThemeTypings['colorSchemes']
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
  referanceLink = '',
  colorScheme = 'blue',
}: ArchivePostGenAIProps) => {
  const { t } = useTranslation()
  const [numberOfDescriptions, setNumberOfDescriptions] = useState<number>(5)
  const [numberOfSentences, setNumberOfSentences] = useState<number>(5)
  const [charLimitOfDescriptions, setCharLimitOfDescriptions] =
    useState<number>(200)
  const [charLimitOfSentences, setCharLimitOfSentences] = useState<number>(150)
  const {
    getPosts,
    addPosts,
    removePosts,
    modifyPost,
    askBeforeDelete,
    hashtagId,
    setAskBeforeDelete,
  } = useGenPostContext()
  const [isSaving, setIsSaving] = useState(false)
  const [useApiInDev, setUseApiInDev] = useState(false)
  const posts = getPosts(archiveContentId)
  const { token } = useAuthContext()

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
    api: '/api/gen-archive-content-posts',
    initialInput: content,
    body: {
      numberOfDescriptions,
      numberOfSentences,
      charLimitOfDescriptions,
      charLimitOfSentences,
      language,
      useApiInDev,
    },
    onFinish(prompt: string, completion: string) {
      const parsedCompletion = JSON.parse(completion)
      const archived = addPosts(archiveContentId, parsedCompletion)
      onSuccess?.(archived)
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

  const completed = isLoading ? parseUncomletedPosts(completion) : null

  const handleSave = async () => {
    setIsSaving(true)
    const finalPosts: PostCreateInput[] = posts.map(post => {
      return {
        ...post.postInput,
        description: post.description,
        content: post.description,
        reference: referanceLink,
        locale,
        hashtag: hashtagId,
      } as PostCreateInput
    })

    const url = API_URL + '/api/posts/createPosts'
    try {
      const responce = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ data: finalPosts }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!responce.ok) throw Error(responce.statusText)

      const addedPosts: { id: number; description: string }[] =
        await responce.json()

      try {
        for (const post of addedPosts) {
          const localPost = posts.find(p => p.description === post.description)
          if (!localPost) {
            toastMessage(
              'Error',
              'Post not found : ' + post.description,
              'error',
            )
            continue
          }

          for (let i = 0; i < localPost.sentences.length; i++) {
            const sentence = localPost.sentences[i]
            await createHashtagSentence({
              hashtagId,
              value: `${sentence}::${post.id}::${0}::${0}`,
            })
            localPost.sentences[i] = ''
            modifyPost(archiveContentId, localPost)
            await sleep(50)
          }
        }
      } catch (e) {
        for (const { id } of addedPosts) {
          await fetch(API_URL + '/api/posts/' + id, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        }
        throw e
      }

      removePosts(archiveContentId, true)
      toastMessage('Success', 'Posts saved', 'success')
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      toastMessage('Error', msg, 'error')
      console.error(msg)
    }

    setIsSaving(false)
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
                defaultValue={charLimitOfDescriptions}
                value={charLimitOfDescriptions}
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
                defaultValue={charLimitOfSentences}
                value={charLimitOfSentences}
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
            <FormLabel htmlFor="askBeforeDelete" mb="0">
              Always ask before deleting
            </FormLabel>
            <Switch
              id="askBeforeDelete"
              isChecked={askBeforeDelete}
              onChange={e => setAskBeforeDelete(e.target.checked)}
              mr={5}
            />
            <FormControl w="auto" display="flex" alignItems="center">
              <FormLabel htmlFor="useApiInDev" mb="0">
                Use API in Dev
              </FormLabel>
              <Switch
                id="useApiInDev"
                isChecked={useApiInDev}
                onChange={e => setUseApiInDev(e.target.checked)}
                colorScheme={colorScheme}
              />
            </FormControl>
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
            {posts.length > 0 && (
              <>
                <Button
                  leftIcon={<FaSave />}
                  type="button"
                  onClick={handleSave}
                  colorScheme={'purple'}
                  isLoading={isSaving}
                  loadingText="Saving..."
                >
                  Save All
                </Button>
                <Button
                  leftIcon={<FaTrash />}
                  type="button"
                  isDisabled={isSaving}
                  onClick={() => removePosts(archiveContentId)}
                  colorScheme={'red'}
                >
                  Clear Results
                </Button>
              </>
            )}
          </HStack>
        </Stack>
      </form>
      {isLoading && (
        <Box p={4}>
          <Progress
            size="xs"
            mb={4}
            isIndeterminate
            colorScheme={'purple'}
            bgColor={'whiteAlpha.700'}
          />
          <Stack spacing={4} p={4}>
            {completed?.map((postObject, index) => (
              <EditablePost
                archiveId={-1}
                key={index + postObject.description}
                postObject={{ ...postObject } as ArchivePost}
              />
            ))}
          </Stack>
        </Box>
      )}
      <Stack spacing={4} p={4}>
        {posts.length > 0 && (
          <Stack>
            <Text as={'b'} width={'100%'} pb={2}>
              {posts.length} posts saved with the following caps content:
            </Text>
            {posts.map(postObject => (
              <EditablePost
                archiveId={isSaving ? -1 : archiveContentId}
                key={postObject.id}
                postObject={postObject}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
