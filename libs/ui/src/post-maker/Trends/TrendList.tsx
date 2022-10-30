import { SkeletonText, VStack, Wrap } from '@chakra-ui/react'
import {
  addTrendName,
  removeTrendName,
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
  const { trendNames, defaultHashtags } = useAppSelector(state => state.post)

  const dispatch = useAppDispatch()

  const onAddTrendName = (value: string) => {
    dispatch(addTrendName(value))
  }

  const onRemoveTrendName = (value: string) => {
    dispatch(removeTrendName(value))
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
