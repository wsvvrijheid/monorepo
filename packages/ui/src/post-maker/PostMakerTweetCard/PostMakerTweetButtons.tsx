import { Button, HStack, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { track } from '@vercel/analytics'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'
import { RxTwitterLogo } from 'react-icons/rx'

import { SITE_URL } from '@wsvvrijheid/config'
import { useHashtag, useUpdateHashtagSentence } from '@wsvvrijheid/services'
import { RedisPost } from '@wsvvrijheid/types'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'
import { useHashtagContext } from '../HashtagProvider'
import { usePostContext } from '../PostProvider'

export const PostMakerTweetButtons = ({ isAdminMode }) => {
  const router = useRouter()
  const { setActivePostId, mentionsDisclosure, trendsDisclosure } =
    useHashtagContext()

  const hashtag = useHashtag()
  const { postContent, post, sentence } = usePostContext()

  const { asPath } = router
  const queryClient = useQueryClient()
  const updatePostSentence = useUpdateHashtagSentence()

  // @ts-ignore
  const { t } = useTranslation()

  if (!sentence) return null

  const url = `\n\n${SITE_URL}${asPath}/${post.id}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url,
    text: `${postContent}`,
  }
  const queryParams = new URLSearchParams(params)

  const postUrl = `${baseUrl}?${queryParams.toString()}`

  const onTweet = async () => {
    const { value, index, shareCount = 0, isPublished } = sentence || {}
    track('post_maker', { action: 'tweet' })

    const published = isPublished ? 1 : 0
    const shares = shareCount + 1
    const sentenceValue =
      `${value}::${post.id}::${shares}::${published}` as RedisPost

    if (post && !Number.isNaN(index)) {
      updatePostSentence.mutate(
        {
          hashtagId: hashtag.id,
          index,
          value: sentenceValue,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries([
              'kv-hashtag-sentences',
              hashtag.id,
            ])
          },
          onError: error => {
            console.log('Error', error)
          },
          onSettled: () => {
            window.open(postUrl, '_blank')
          },
        },
      )
    }
  }

  if (!post) return null

  return (
    <HStack justifyContent={'space-between'}>
      <Button
        variant={'ghost'}
        onClick={() => {
          track('post_maker', { action: 'add_mentions' })
          setActivePostId(post.id)
          mentionsDisclosure.onOpen()
        }}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<GoMention />}
      >
        <Text display={{ base: 'none', md: 'block' }}>
          {t('post.add-mention')}
        </Text>
      </Button>

      <Button
        variant={'ghost'}
        onClick={() => {
          track('post_maker', { action: 'add_trends' })
          setActivePostId(post.id)
          trendsDisclosure.onOpen()
        }}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<MdTrendingUp />}
      >
        <Text display={{ base: 'none', md: 'block' }}>
          {t('post.add-trend')}
        </Text>
      </Button>

      <PostMakerTweetProgress />

      <Button
        variant={'ghost'}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<RxTwitterLogo />}
        onClick={onTweet}
      >
        <Text mr={2} display={{ base: 'none', md: 'block' }}>
          Tweet
        </Text>
        <Text>{sentence.shareCount}</Text>
      </Button>

      <PostMakerTweetShare
        url={url}
        content={post?.description as string}
        isAdminMode={isAdminMode}
      />
    </HStack>
  )
}
