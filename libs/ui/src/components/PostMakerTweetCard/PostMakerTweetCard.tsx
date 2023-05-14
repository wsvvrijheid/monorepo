import { FC } from 'react'

import { Button, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'
import { RxTwitterLogo } from 'react-icons/rx'

import { SITE_URL } from '@wsvvrijheid/config'

import { PostMakerTweetProgress } from './PostMakerTweetProgress'
import { PostMakerTweetShare } from './PostMakerTweetShare'
import { PostMakerTweetTags } from './PostMakerTweetTags'
import { PostMakerTweetCardProps } from './types'
import { PostImage } from '../PostImage'

export const PostMakerTweetCard: FC<PostMakerTweetCardProps> = ({
  post,
  onAddMention,
  onAddTrend,
  toggleMentionsModal,
  toggleTrendsModal,
}) => {
  const {
    asPath,
    locale,
    query: { slug },
  } = useRouter()

  const url = `${SITE_URL}${asPath}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url: `${SITE_URL}/${locale}/hashtags/${slug}/`,
    text: `${post.postContent}\n\n`,
  }
  const query = new URLSearchParams(params)
  const result = query.toString()

  const postUrl = `${baseUrl}?${result.toString()}`

  if (!post.data) return null

  return (
    <Stack p={2} _hover={{ bg: 'blackAlpha.100' }}>
      <Text>{post.postText}</Text>
      <PostMakerTweetTags
        mentions={post.mentionUsernames}
        trends={post.trendNames}
        onMentionClick={mention => onAddMention(mention)}
        onTrendClick={trend => onAddTrend(trend)}
      />
      <PostImage post={post.data} rounded="md" />

      <HStack justifyContent={'space-between'}>
        <Button
          variant={'ghost'}
          onClick={toggleMentionsModal}
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<GoMention />}
        >
          <Text display={{ base: 'none', md: 'block' }}>Add Mention</Text>
        </Button>
        <Button
          variant={'ghost'}
          onClick={toggleTrendsModal}
          iconSpacing={{ base: 0, md: 2 }}
          leftIcon={<MdTrendingUp />}
        >
          <Text display={{ base: 'none', md: 'block' }}>Add Trend</Text>
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
    </Stack>
  )
}
