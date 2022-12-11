import { FC } from 'react'

import { Box, HStack, Link, Text } from '@chakra-ui/react'
import { Tweet } from '@wsvvrijheid/types'
import { useLocalStorage } from 'usehooks-ts'

import { TimelineTweet } from '../TimelineTweet'
import { TimelineBoardProps } from './types'

export const TimelineBoard: FC<TimelineBoardProps> = ({ timelines }) => {
  const [tweetBookmarksStorage, setTweetBookmarksStorage] = useLocalStorage<
    Tweet[]
  >('tweetBookmarks', [])
  const onEdit = () => {
    console.log('edit')
  }
  // this function's parameters type is : TimelineTweetProps but I dont know how can I use this type
  const onSave = (tweet, user) => {
    const newSavedTweet = { tweet, user }

    if (tweetBookmarksStorage.length > 0) {
      const filteredBookmarks = tweetBookmarksStorage?.filter(
        t => t.tweet.id !== tweet.id,
      )

      setTweetBookmarksStorage([...filteredBookmarks, newSavedTweet])
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
      align="start"
      bg={'white'}
      rounded="lg"
      p={4}
      gap={4}
      overflowY="auto"
      shouldWrapChildren={true}
    >
      {timelines?.map(timeline => (
        <Box
          w="500px"
          overflowX="auto"
          borderRadius="6px"
          border="1px"
          borderColor="gray.300"
        >
          <Link
            href={`https://twitter/com/${timeline.userData.username}`}
            target="_blank"
            rel="noreferrer noopener"
            cursor="pointer"
          >
            <Box bg="blue.400" borderBottom="1px" color="white" p={3}>
              <HStack>
                <Text
                  fontSize={'sm'}
                  wordBreak={'break-all'}
                  fontWeight={'bolder'}
                >
                  {timeline.userData.name} - @{timeline.userData.username}
                </Text>
              </HStack>
            </Box>
          </Link>
          {/* I assigned height 700 randomly. What height do you think I should assign? */}
          <Box overflowY="auto" h="700px">
            {timeline.tweets.map((tweet, key) => (
              <TimelineTweet
                tweet={tweet}
                onEdit={onEdit}
                user={timeline.userData}
                onSave={onSave}
                key={key}
              />
            ))}
          </Box>
        </Box>
      ))}
    </HStack>
  )
}
