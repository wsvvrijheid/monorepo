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
} from '@chakra-ui/react'
import { BsBookmarkPlus, BsThreeDots } from 'react-icons/bs'
import { RiEditLine } from 'react-icons/ri'
import { useLocalStorage } from 'usehooks-ts'

import { TweetText } from './TweetText'
import { TimelineLocalTweet, TimelineTweetProps } from './types'

export const TimelineTweet: FC<TimelineTweetProps> = ({
  tweet,
  user,
  onEdit,
  ...rest
}) => {
  const [tweetBookmarksStorage, setTweetBookmarksStorage] = useLocalStorage<
    TimelineLocalTweet[]
  >('tweetBookmarks', [])

  const isBookmarked = tweetBookmarksStorage?.some(t => t.tweet.id === tweet.id)

  const onSave = (data: TimelineLocalTweet) => {
    const newSavedTweet = data

    if (tweetBookmarksStorage.length > 0) {
      const filteredBookmarks = tweetBookmarksStorage?.filter(
        t => t.tweet.id !== data.tweet.id,
      )
      if (tweetBookmarksStorage?.some(t => t.tweet.id === data.tweet.id)) {
        setTweetBookmarksStorage([...filteredBookmarks])
      } else {
        setTweetBookmarksStorage([...filteredBookmarks, newSavedTweet])
      }
    } else {
      const newTweetBookmarks = [
        ...(tweetBookmarksStorage || []),
        newSavedTweet,
      ]
      setTweetBookmarksStorage(newTweetBookmarks)
    }
  }

  return (
    <HStack
      spacing={4}
      align={'start'}
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      p={4}
      {...rest}
    >
      <Avatar size={'sm'} name={user.username} src={user.profile} mr={1} />

      <Stack spacing={4}>
        {/* Tweet Header */}
        <HStack justify={'space-between'}>
          <Box lineHeight={1.15}>
            <Text noOfLines={1} wordBreak={'break-all'} fontWeight={'bolder'}>
              {user.name}
            </Text>
            <Text noOfLines={1} color={'gray.500'}>
              @{user.username}
            </Text>
          </Box>

          {onEdit && onSave && (
            <Menu>
              <MenuButton
                size="sm"
                rounded="full"
                as={IconButton}
                icon={<BsThreeDots />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem
                  icon={<RiEditLine />}
                  onClick={() => onEdit({ tweet, user })}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<BsBookmarkPlus color={isBookmarked ? 'red' : ''} />}
                  onClick={() => onSave({ tweet, user })}
                >
                  {isBookmarked ? 'Remove' : 'Save'} (Bookmark)
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
        <TweetText tweet={tweet} />
      </Stack>
    </HStack>
  )
}
