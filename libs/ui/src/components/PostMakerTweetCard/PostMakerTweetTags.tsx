import React, { FC } from 'react'

import { Stack, Tag, Wrap } from '@chakra-ui/react'

import { PostMakerTweetTagsProps } from './types'

export const PostMakerTweetTags: FC<PostMakerTweetTagsProps> = ({
  mentions,
  trends,
  onMentionClick,
  onTrendClick,
}) => {
  return (
    <Stack>
      <Wrap>
        {mentions.map(mention => (
          <Tag
            variant={'outline'}
            rounded={'full'}
            px={2}
            onClick={() => onMentionClick(mention)}
          >
            @{mention}
          </Tag>
        ))}
      </Wrap>
      <Wrap>
        {trends.map(trend => (
          <Tag
            variant={'outline'}
            rounded={'full'}
            px={2}
            onClick={() => onTrendClick(trend)}
          >
            {trend}
          </Tag>
        ))}
      </Wrap>
    </Stack>
  )
}
