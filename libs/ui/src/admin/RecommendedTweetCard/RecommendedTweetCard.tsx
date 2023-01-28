import { FC } from 'react'

import { Box, Divider, Stack, useBreakpointValue } from '@chakra-ui/react'
import {
  RecommendedTweet,
  Tweet,
  TweetUserBase,
  User,
} from '@wsvvrijheid/types'

import { RecommendedSocialButtons } from './RecommendedSocialButtons'
import { RecommendedTweetCardProps } from './types'
import { TweetCard } from '../TweetCard'

export const RecommendedTweetCard: FC<RecommendedTweetCardProps> = ({
  tweet,
}) => {
  const mapRecommenderToTweetUser = (creator?: User | null) => {
    if (!creator) return

    return {
      name: creator.name as string,
      username: creator.username,
      profile: creator.avatar?.url,
    }
  }

  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  const mapRecommendedTweetToTweet = (
    recommendedTweet: RecommendedTweet,
  ): Partial<Tweet> => {
    return {
      text: recommendedTweet.text,
      user: mapRecommenderToTweetUser(
        recommendedTweet.creator,
      ) as TweetUserBase,
      image:
        recommendedTweet?.image?.url || recommendedTweet?.originalTweet?.image,
      video: recommendedTweet?.video?.url,
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
      <TweetCard
        tweet={mapRecommendedTweetToTweet(tweet) as Tweet}
        editable
        shadow={'none'}
      />
      <Divider />
      <Box p={2}>
        <RecommendedSocialButtons tweet={tweet} isVertical={isVertical} />
      </Box>
    </Stack>
  )
}
