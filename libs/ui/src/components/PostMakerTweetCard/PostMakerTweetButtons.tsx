import {
  Button,
  HStack,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'
import { RxTwitterLogo } from 'react-icons/rx'

import { SITE_URL } from '@wsvvrijheid/config'
import { useHashtagContext, usePostContext } from '@wsvvrijheid/context'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'
import { TrendListTabs } from '../../post-maker/Trends'

export const PostMakerTweetButtons = () => {
  const router = useRouter()
  const { setActivePostId, mentionsDisclosure, trendsDisclosure } =
    useHashtagContext()
  const { postContent, post } = usePostContext()

  const { asPath, locale, query } = router

  const { t } = useTranslation()

  const url = `${SITE_URL}${asPath}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url: `${SITE_URL}/${locale}/hashtags/${query['slug']}/`,
    text: `${postContent}\n\n`,
  }
  const queryParams = new URLSearchParams(params)

  const postUrl = `${baseUrl}?${queryParams.toString()}`

  const onTweet = () => {
    console.log('tweet')
  }

  if (!post) return null

  return (
    <HStack justifyContent={'space-between'}>
      <Button
        variant={'ghost'}
        onClick={() => {
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

      <Popover placement="top">
        <PopoverTrigger>
          <Button
            variant={'ghost'}
            onClick={() => {
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
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverBody>
              <TrendListTabs />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      <PostMakerTweetProgress />

      <Link href={postUrl} target={'_blank'}>
        <Button
          variant={'ghost'}
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<RxTwitterLogo />}
          onClick={onTweet}
        >
          <Text display={{ base: 'none', md: 'block' }}>Tweet</Text>
        </Button>
      </Link>

      <PostMakerTweetShare url={url} content={post?.description as string} />
    </HStack>
  )
}
