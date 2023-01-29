import { FC } from 'react'

import { Box, HStack, Link, Text } from '@chakra-ui/react'

import { TimelineBoardProps } from './types'
import { TweetCard } from '../TweetCard'

export const TimelineBoard: FC<TimelineBoardProps> = ({ timelines }) => {
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
          key={timeline.id}
          w="500px"
          overflowX="auto"
          borderRadius="6px"
          border="1px"
          borderColor="gray.300"
        >
          <Link
            href={`https://twitter.com/${timeline?.userData?.username}`}
            target="_blank"
            rel="noreferrer noopener"
            cursor="pointer"
          >
            <Box bg="twitter.500" borderBottom="1px" color="white" p={3}>
              <Text
                fontSize={'sm'}
                wordBreak={'break-all'}
                fontWeight={'bolder'}
              >
                {timeline?.userData?.name} - @{timeline?.userData?.username}
              </Text>
            </Box>
          </Link>

          <Box overflowY="auto" h="700px">
            {timeline?.tweets?.map((tweet, key) => {
              // FIXME: Why image is not showing up?
              return (
                <TweetCard
                  tweet={{
                    ...tweet,
                    user: timeline.userData,
                  }}
                  editable
                  key={key}
                />
              )
            })}
          </Box>
        </Box>
      ))}
    </HStack>
  )
}
