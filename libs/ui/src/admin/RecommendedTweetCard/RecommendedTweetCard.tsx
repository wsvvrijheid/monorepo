import { FC, useState } from 'react'

import { Stack, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  RecommendedTweetCreateInput,
  TimelineTweet as TimelineTweetType,
  User,
} from '@wsvvrijheid/types'

import { RecommendedSocialButtons } from './RecommendedSocialButtons'
import { RecommendedTweetCardProps } from './types'
import { CreateTweetForm } from '../../components'
import { TimelineLocalTweet, TimelineTweet } from '../TimelineTweet'

export const RecommendedTweetCard: FC<RecommendedTweetCardProps> = ({
  tweet,
  key,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editTweet, setEditTweet] = useState<TimelineTweetType>()

  const { user } = useAuthSelector()
  const { mutateAsync } = useRecommendTweet()

  const mapRecommenderToTweetUser = (
    recommender: User,
  ): { name?: string; username: string; profile?: string } => {
    return {
      name: recommender.name as string,
      username: recommender.username,
      profile: recommender.avatar?.url,
    }
  }

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
  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  const onEdit = (data: TimelineLocalTweet) => {
    setEditTweet(data.tweet)
    onOpen()
  }
  return (
    <Stack
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      p={4}
      align={'space-between'}
      overflow="hidden"
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
      <TimelineTweet
        tweet={tweet as unknown as TimelineTweetType}
        user={mapRecommenderToTweetUser(tweet.recommender)}
        onEdit={onEdit}
        key={key}
      />
      <RecommendedSocialButtons tweet={tweet} isVertical={isVertical} />
    </Stack>
  )
}
