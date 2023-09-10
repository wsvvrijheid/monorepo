import { FC } from 'react'

import { Button, HStack, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { track } from '@vercel/analytics'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { FaTwitter } from 'react-icons/fa'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'

import { SITE_URL } from '@wsvvrijheid/config'
import { useHashtag, useUpdateHashtagSentence } from '@wsvvrijheid/services'
import { RedisPost } from '@wsvvrijheid/types'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'
import { useHashtagContext } from '../HashtagProvider'
import { usePostContext } from '../PostProvider'

type PostMakerTweetButtonsProps = {
  isIosSafari?: boolean
}

export const PostMakerTweetButtons: FC<PostMakerTweetButtonsProps> = ({
  isIosSafari,
}) => {
  const router = useRouter()
  const { setActivePostId, mentionsDisclosure, trendsDisclosure } =
    useHashtagContext()

  const hashtag = useHashtag()
  const { postContent, post, sentence } = usePostContext()

  const { asPath, locale } = router
  const queryClient = useQueryClient()
  const updatePostSentence = useUpdateHashtagSentence()

  const { t } = useTranslation()

  if (!sentence || !post) return null

  const url = `\n\n${SITE_URL}/${locale}${asPath}?id=${post.id}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url,
    text: `${postContent}`,
  }
  const queryParams = new URLSearchParams(params)

  const postUrl = `${baseUrl}?${queryParams.toString()}`

  const onTweet = async () => {
    window.open(postUrl, '_blank')
  }

  const onShare = async () => {
    const { value, index, shareCount = 0, isPublished } = sentence || {}
    track('post_maker', { action: 'tweet' })

    const published = isPublished ? 1 : 0
    const shares = shareCount + 1
    const sentenceValue =
      `${value}::${post.id}::${shares}::${published}` as RedisPost

    if (post && !Number.isNaN(index)) {
      try {
        await updatePostSentence.mutateAsync(
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
          },
        )
      } catch (error) {
        console.log('Error', error)
      }
    }
  }

  if (!post) return null

  return (
    <HStack justifyContent={'space-between'} spacing={4}>
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
        <Text isTruncated display={{ base: 'none', md: 'block' }}>
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
        <Text isTruncated display={{ base: 'none', md: 'block' }}>
          {t('post.add-trend')}
        </Text>
      </Button>

      <PostMakerTweetProgress />

      {!isIosSafari && (
        <Button
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<FaTwitter />}
          onClick={() => {
            onShare().then(() => onTweet())
          }}
          rightIcon={<Text>{sentence.shareCount}</Text>}
          fontWeight={600}
        >
          <Text mr={2}>Tweet</Text>
        </Button>
      )}

      {isIosSafari && (
        <TwitterShareButton url={url} title={postContent}>
          <Button
            as={'span'}
            iconSpacing={{ base: 0, md: 2 }}
            leftIcon={<FaTwitter />}
            onClick={onShare}
            fontWeight={600}
          >
            <Text mr={2}>Tweet</Text>
            <Text>{sentence.shareCount}</Text>
          </Button>
        </TwitterShareButton>
      )}

      <PostMakerTweetShare url={url} content={post?.description as string} />
    </HStack>
  )
}
