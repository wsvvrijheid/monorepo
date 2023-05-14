import React, { FC } from 'react'

import { Button, HStack, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'
import { RxTwitterLogo } from 'react-icons/rx'

import { SITE_URL } from '@wsvvrijheid/config'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'
import { PostMakerTweetButtonsProps } from './types'

export const PostMakerTweetButtons: FC<PostMakerTweetButtonsProps> = ({
  post,
  toggleMentionsModal,
  toggleTrendsModal,
}) => {
  const {
    asPath,
    locale,
    query: { slug },
  } = useRouter()

  const { t } = useTranslation()

  const url = `${SITE_URL}${asPath}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url: `${SITE_URL}/${locale}/hashtags/${slug}/`,
    text: `${post.postContent}\n\n`,
  }
  const query = new URLSearchParams(params)
  const result = query.toString()

  const postUrl = `${baseUrl}?${result.toString()}`

  return (
    <HStack justifyContent={'space-between'}>
      <Button
        variant={'ghost'}
        onClick={toggleMentionsModal}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<GoMention />}
      >
        <Text display={{ base: 'none', md: 'block' }}>
          {t('post.add-mention')}
        </Text>
      </Button>
      <Button
        variant={'ghost'}
        onClick={toggleTrendsModal}
        iconSpacing={{ base: 0, md: 2 }}
        leftIcon={<MdTrendingUp />}
      >
        <Text display={{ base: 'none', md: 'block' }}>
          {t('post.add-trend')}
        </Text>
      </Button>

      <PostMakerTweetProgress />

      <Link href={postUrl} target={'_blank'}>
        <Button
          variant={'ghost'}
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<RxTwitterLogo />}
        >
          <Text display={{ base: 'none', md: 'block' }}>Tweet</Text>
        </Button>
      </Link>

      <PostMakerTweetShare url={url} content={post.postText} />
    </HStack>
  )
}
