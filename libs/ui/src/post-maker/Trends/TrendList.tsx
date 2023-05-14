import { SkeletonText, VStack, Wrap } from '@chakra-ui/react'

import {
  addTrendToPost,
  removeTrendFromPost,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/store'
import { TwitterTrend } from '@wsvvrijheid/types'

import { TrendListItem } from './TrendListItem'

interface TrendListProps {
  trends?: TwitterTrend[] | null
  isLoading: boolean
  hashtagInTrends?: TwitterTrend
  hashtagExtraInTrends?: TwitterTrend
}

export const TrendList = ({
  trends,
  isLoading,
  hashtagInTrends,
  hashtagExtraInTrends,
}: TrendListProps): JSX.Element => {
  const { trendNames, defaultHashtags, currentPostId } = useAppSelector(
    state => state.hashtag,
  )

  const dispatch = useAppDispatch()

  const onAddTrendName = (value: string) => {
    if (!currentPostId) return

    dispatch(
      addTrendToPost({
        postId: currentPostId,
        trend: value,
      }),
    )
  }

  const onRemoveTrendName = (value: string) => {
    if (!currentPostId) return

    dispatch(
      removeTrendFromPost({
        postId: currentPostId,
        trend: value,
      }),
    )
  }

  return (
    <VStack align="stretch">
      {isLoading || !trends ? (
        <SkeletonText skeletonHeight={6} noOfLines={5} />
      ) : (
        <Wrap>
          {trends.map((tag, i) => (
            <TrendListItem
              key={i}
              order={i + 1}
              trendName={tag.name}
              tweetsCount={tag.tweet_volume}
              hashtagInTrends={hashtagInTrends?.name}
              hashtagExtraInTrends={hashtagExtraInTrends?.name}
              trendNames={trendNames}
              defaultHashtags={defaultHashtags}
              addTrend={onAddTrendName}
              removeTrend={onRemoveTrendName}
            />
          ))}
        </Wrap>
      )}
    </VStack>
  )
}
