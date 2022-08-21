import React, { FC } from 'react'

import { Box, HStack, Tag, TagLabel } from '@chakra-ui/react'
import { formatNumber } from '@utils'

interface TrendItemProps {
  trendName: string
  tweetsCount: number | null
  hashtagInTrends?: string
  hashtagExtraInTrends?: string
  order: number
  addTrend: (value: string) => void
  removeTrend: (value: string) => void
  trendNames: string[]
  defaultHashtags: string[]
}

export const TrendItem: FC<TrendItemProps> = ({
  trendName,
  tweetsCount,
  hashtagInTrends,
  hashtagExtraInTrends,
  order,
  addTrend,
  removeTrend,
  trendNames,
  defaultHashtags,
}) => {
  const isCurrentHashtag =
    hashtagInTrends === trendName || hashtagExtraInTrends === trendName

  const isSelectedHashtag = [...trendNames, ...defaultHashtags].includes(
    trendName,
  )

  const colorScheme = isCurrentHashtag
    ? 'twitter'
    : isSelectedHashtag
    ? 'blackAlpha'
    : 'primary'

  const onTrendClick = (trendName: string) => {
    if (isCurrentHashtag) {
      return
    }
    if (isSelectedHashtag) {
      return removeTrend(trendName)
    }
    addTrend(trendName)
  }

  return (
    <Tag
      rounded="full"
      variant="outline"
      colorScheme={colorScheme}
      onClick={() => onTrendClick(trendName)}
      cursor={isCurrentHashtag ? 'not-allowed' : 'pointer'}
      py={1}
    >
      <HStack as={TagLabel}>
        <Box>{order}</Box>
        <Box>{trendName}</Box>
        {tweetsCount && <Box fontSize="xs">({formatNumber(tweetsCount)})</Box>}
      </HStack>
    </Tag>
  )
}
