import { FC, useState } from 'react'

import { Box, HStack, Link, Text, useDisclosure } from '@chakra-ui/react'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  RecommendedTweetCreateInput,
  TimelineTweet as TimelineTweetType,
} from '@wsvvrijheid/types'

import { TimelineBoardProps } from './types'
import { CreateTweetForm } from '../../components/CreateTweetForm'
import { TimelineLocalTweet, TimelineTweet } from '../TimelineTweet'

export const TimelineBoard: FC<TimelineBoardProps> = ({ timelines }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editTweet, setEditTweet] = useState<TimelineTweetType>()

  const { user } = useAuthSelector()
  const { mutateAsync } = useRecommendTweet()

  const handleSubmit = async (
    text: string,
    originalTweet: TimelineTweetType,
    mentions: number[],
    media?: File,
  ) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      recommender: Number(user?.id),
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      media,
      text,
      mentions,
    }

    await mutateAsync(recommendedTweet)
    onClose()
  }

  const onEdit = (data: TimelineLocalTweet) => {
    setEditTweet(data.tweet)
    onOpen()
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
      {editTweet && (
        <CreateTweetForm
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
          originalTweet={editTweet}
          isNews={false}
        />
      )}

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
            {timeline?.tweets?.map((tweet, key) => (
              <TimelineTweet
                tweet={tweet}
                user={timeline.userData}
                onEdit={onEdit}
                key={key}
              />
            ))}
          </Box>
        </Box>
      ))}
    </HStack>
  )
}
