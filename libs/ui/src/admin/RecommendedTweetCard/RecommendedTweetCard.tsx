import { FC, useState } from 'react'

import {
  Box,
  Divider,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  RecommendedTweet,
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

  const mapRecommendedTweetToTimelineTweet = (
    recommendedTweet: RecommendedTweet,
  ): Partial<TimelineTweetType> => {
    const mentions = recommendedTweet?.mentions
      ?.map(mention => `@${mention?.username}`)
      .join(' ')
    const quoteTweet = [recommendedTweet?.text, mentions]
      .filter(a => !!a)
      .join('\n\n')

    return {
      text: quoteTweet,
      media: {
        url: recommendedTweet?.media?.url,
        preview_image_url: recommendedTweet?.media?.url,
        type: recommendedTweet?.media?.mime,
        media_key: '',
      },
    }
  }

  return (
    <Stack
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      align={'space-between'}
      overflow="hidden"
      spacing={0}
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
        tweet={mapRecommendedTweetToTimelineTweet(tweet) as TimelineTweetType}
        user={mapRecommenderToTweetUser(tweet.recommender)}
        onEdit={onEdit}
        key={key}
        shadow={'none'}
      />
      <Divider />
      <Box p={2}>
        <RecommendedSocialButtons tweet={tweet} isVertical={isVertical} />
      </Box>
    </Stack>
  )
}
