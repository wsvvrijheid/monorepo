import { FC } from 'react'

import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { RecommendedTweetCreateInput, Tweet } from '@wsvvrijheid/types'
import { BsBookmarkPlus, BsThreeDots } from 'react-icons/bs'
import { RiEditLine } from 'react-icons/ri'
import { useLocalStorage } from 'usehooks-ts'

import { TweetCardProps } from './types'
import { CreateTweetForm } from '../../components'
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
      <CreateTweetForm
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        originalTweet={tweet as Tweet}
        isNews={false}
      />
      <HStack
        spacing={4}
        align={'start'}
        bg={'white'}
        rounded={'md'}
        shadow={'sm'}
        p={4}
        {...rest}
      >
        {tweet.user && (
          <Avatar
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
                <Text
                  noOfLines={1}
                  wordBreak={'break-all'}
                  fontWeight={'bolder'}
                >
                  {tweet.user.name}
                </Text>
                <Text noOfLines={1} color={'gray.500'}>
                  @{tweet.user.username}
                </Text>
              </Box>
            )}

            {(bookmarkable || editable) && (
              <Menu>
                <MenuButton
                  size="sm"
                  rounded="full"
                  as={IconButton}
                  icon={<BsThreeDots />}
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem icon={<RiEditLine />} onClick={handleEdit}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    icon={<BsBookmarkPlus color={isBookmarked ? 'red' : ''} />}
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
        </Stack>
      </HStack>
    </>
  )
}
