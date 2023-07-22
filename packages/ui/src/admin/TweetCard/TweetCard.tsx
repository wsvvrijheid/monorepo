import { FC } from 'react'

import {
  Box,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { BsThreeDots } from 'react-icons/bs'
import {
  TbBookmark,
  TbBrandTwitter,
  TbChartBar,
  TbClock,
  TbHeart,
  TbMessageCircle,
  TbRefresh,
  TbThumbUp,
} from 'react-icons/tb'
import { useLocalStorage } from 'usehooks-ts'

import { useRecommendTweet } from '@wsvvrijheid/services'
import { Post, RecommendedTweetCreateInput, Tweet } from '@wsvvrijheid/types'

import { TweetCardProps } from './types'
import { CreateTweetForm, WAvatar } from '../../components'
import { CreateTweetFormFieldValues } from '../../components/CreateTweetForm/types'
import { postFields, postSchema } from '../../data'
import { ModelCreateModal } from '../ModelForm'
import { TweetContent } from '../TweetContent'

export const TweetCard: FC<TweetCardProps> = ({
  tweet,
  bookmarkable,
  editable,
  setValue,
  isChangingMedia,
  toggleChangingMedia,
  originalTweet,
  ...rest
}) => {
  const [storageTweets, setStorageTweets] = useLocalStorage<Tweet[]>(
    'bookmarked-tweets',
    [],
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()

  const isBookmarked = storageTweets?.some(t => t.id === tweet.id)

  const { mutateAsync } = useRecommendTweet()

  const newPost = {
    description: tweet.text,
    content: tweet.text,
    image: { url: tweet?.image },
  } as Post

  const handleBookmark = () => {
    if (isBookmarked) {
      const filteredBookmarks = storageTweets?.filter(t => t.id !== tweet.id)
      setStorageTweets(filteredBookmarks)
    } else {
      setStorageTweets([...storageTweets, tweet])
    }
  }

  const handleEdit = () => {
    onOpen()
  }

  const handleSubmit = async (data: CreateTweetFormFieldValues) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      image: data.image,
      text: data.text,
      mentions: data.mentions?.map(m => Number(m.value)),
    }

    await mutateAsync(recommendedTweet)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <CreateTweetForm
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
          originalTweet={tweet as Tweet}
          isNews={false}
        />
      )}
      <HStack align={'start'} bg={'white'} rounded={'md'} p={4} {...rest}>
        {tweet.user && (
          <WAvatar
            size={'sm'}
            flexShrink={0}
            name={tweet.user.name}
            src={tweet.user.profile}
          />
        )}

        <Stack flex={1} spacing={4}>
          {/* Tweet Header */}
          <HStack justify={'space-between'} title={tweet.user?.username}>
            {tweet.user && (
              <Box lineHeight={1.15}>
                <Text noOfLines={1} wordBreak={'break-all'} fontWeight={700}>
                  {tweet.user.name}
                </Text>
                <Text noOfLines={1} color={'gray.500'}>
                  @{tweet.user.username}
                </Text>
              </Box>
            )}

            {(bookmarkable || editable) && (
              <Menu placement="bottom-end">
                <MenuButton
                  size="sm"
                  rounded="full"
                  as={IconButton}
                  icon={<BsThreeDots />}
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem icon={<TbThumbUp />} onClick={handleEdit}>
                    Recommend
                  </MenuItem>
                  <ModelCreateModal<Post>
                    title={t('create-post')}
                    url="api/posts"
                    schema={postSchema}
                    fields={postFields}
                    model={newPost}
                    buttonProps={{
                      variant: 'ghost',
                      w: 'full',
                      justifyContent: 'start',
                      colorScheme: 'gray',
                      leftIcon: <Box fontSize={'sm'} as={TbBrandTwitter} />,
                      rounded: 'none',
                      fontWeight: 400,
                      px: 3,
                    }}
                  >
                    {t('create-post')}
                  </ModelCreateModal>
                  <MenuItem
                    icon={<TbBookmark color={isBookmarked ? 'red' : ''} />}
                    onClick={handleBookmark}
                  >
                    {isBookmarked ? 'Remove' : 'Save'} (Bookmark)
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>

          <TweetContent
            tweet={tweet}
            setValue={setValue}
            isChangingMedia={isChangingMedia}
            toggleChangingMedia={toggleChangingMedia}
          />
          <HStack justify={'space-between'}>
            {tweet.likes != null && (
              <HStack
                as={Link}
                rel="noopener noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/like?tweet_id=${tweet.id}`}
              >
                <TbHeart />
                <Text fontSize={'sm'}>{tweet.likes}</Text>
              </HStack>
            )}
            {tweet.retweets != null && (
              <HStack
                as={Link}
                rel="noopener noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/retweet?tweet_id=${tweet.id}`}
              >
                <TbRefresh />
                <Text fontSize={'sm'}>{tweet.retweets}</Text>
              </HStack>
            )}
            {tweet.replies != null && (
              <HStack
                as={Link}
                rel="noopener noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`}
              >
                <TbMessageCircle />
                <Text fontSize={'sm'}>{tweet.replies}</Text>
              </HStack>
            )}
            {tweet.impressions != null && (
              <HStack>
                <TbChartBar />
                <Text fontSize={'sm'}>{tweet.impressions}</Text>
              </HStack>
            )}
            {tweet.createdAt && (
              <HStack>
                <TbClock />
                <Text
                  noOfLines={1}
                  fontSize={'sm'}
                  color={'gray.500'}
                  textAlign={'right'}
                >
                  {formatDistanceToNow(new Date(tweet.createdAt as string), {
                    addSuffix: true,
                  })}
                </Text>
              </HStack>
            )}
          </HStack>
        </Stack>
      </HStack>
    </>
  )
}
