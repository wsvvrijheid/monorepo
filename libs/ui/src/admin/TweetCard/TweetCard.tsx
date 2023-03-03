import { FC } from 'react'

import {
  Avatar,
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
import { useRecommendTweet } from '@wsvvrijheid/services'
import { Post, RecommendedTweetCreateInput, Tweet } from '@wsvvrijheid/types'
import { formatDistanceToNow } from 'date-fns'
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

import { TweetCardProps } from './types'
import { CreateTweetForm } from '../../components'
import { postFields, postSchema } from '../../data'
import { ModelCreateModal } from '../ModelForm'
import { TweetContent } from '../TweetContent'

export const TweetCard: FC<TweetCardProps> = ({
  tweet,
  bookmarkable,
  editable,
  setValue,
  isChangingImage,
  setIsChangingImage,
  ...rest
}) => {
  const [storageTweets, setStorageTweets] = useLocalStorage<Tweet[]>(
    'bookmarked-tweets',
    [],
  )
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const handleSubmit = async (
    text: string,
    originalTweet: Partial<Tweet>,
    mentions: number[],
    image?: File,
  ) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      image,
      text,
      mentions,
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
          <Avatar
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
                    title="Create Post"
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
                    Create Post
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
            isChangingImage={isChangingImage}
            setIsChangingImage={setIsChangingImage}
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
