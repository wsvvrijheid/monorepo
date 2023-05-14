import React, { FC } from 'react'

import { Stack, Tag, TagCloseButton, TagLabel, Wrap } from '@chakra-ui/react'

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
            colorScheme={'primary'}
            variant={'outline'}
            rounded={'full'}
            px={2}
          >
            <TagLabel>@{mention}</TagLabel>
            <TagCloseButton onClick={() => onMentionClick(mention)} />
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
            <TagLabel>{trend}</TagLabel>
            <TagCloseButton onClick={() => onTrendClick(trend)} />
          </Tag>
        ))}
      </Wrap>
    </Stack>
  )
}
