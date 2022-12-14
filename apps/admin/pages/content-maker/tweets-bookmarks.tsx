import { Box, HStack, Text } from '@chakra-ui/react'
import { AdminLayout, TimelineLocalTweet, TimelineTweet } from '@wsvvrijheid/ui'
import { useLocalStorage } from 'usehooks-ts'

const TweetBookmarkedPage = () => {
  const [tweetBookmarksStorage] = useLocalStorage<TimelineLocalTweet[]>(
    'tweetBookmarks',
    [],
  )

  return (
    <AdminLayout title="Bookmarked Tweets">
      <HStack
        align="center"
        bg={'white'}
        rounded="lg"
        p={4}
        gap={4}
        overflowY="auto"
        shouldWrapChildren={true}
        display="flex"
        justify="center"
      >
        <Box
          w="500px"
          overflowX="auto"
          borderRadius="6px"
          border="1px"
          borderColor="gray.300"
        >
          <Box bg="blue.400" borderBottom="1px" color="white" p={3}>
            <HStack>
              <Text
                fontSize={'sm'}
                wordBreak={'break-all'}
                fontWeight={'bolder'}
              >
                Bookmarked Tweets
              </Text>
            </HStack>
          </Box>

          <Box overflowY="auto">
            {tweetBookmarksStorage.map((t, key) => (
              <TimelineTweet tweet={t.tweet} user={t.user} key={key} />
            ))}
          </Box>
        </Box>
      </HStack>
    </AdminLayout>
  )
}

export default TweetBookmarkedPage
