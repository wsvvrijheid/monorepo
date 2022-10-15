import { FC } from 'react'

import { Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { formatDistanceStrict } from 'date-fns'
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

import { WImage } from '../../components'
import { ActionButton } from './index'
import { TopicCardBaseProps } from './index'

export const TopicCardBase: FC<TopicCardBaseProps> = ({
  topic,
  onBookmark,
  onRecommend,
  onShare,
  onView,
  isBookmarked,
  isLoading,
}) => {
  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  const time = topic.time
    ? formatDistanceStrict(new Date(topic.time), new Date()) + ' - '
    : ''

  return (
    <Stack
      h={isVertical ? 'auto' : '200px'}
      boxShadow="md"
      rounded="md"
      align={isVertical ? 'stretch' : 'flex-start'}
      direction={isVertical ? 'column' : 'row'}
      overflow="hidden"
    >
      {topic.image && (
        <WImage
          w={isVertical ? 'full' : '300px'}
          h={isVertical ? '200px' : 'full'}
          src={topic.image}
          alt={topic.title}
        />
      )}
      <Stack
        spacing={4}
        p={isVertical ? 4 : 8}
        flex={1}
        justify="space-between"
        h="full"
      >
        <Stack textAlign={isVertical ? 'center' : 'left'}>
          <Text fontSize="lg" fontWeight="semibold" noOfLines={1}>
            {topic.title}
          </Text>
          <Text noOfLines={isVertical ? 3 : 2}>{topic.description}</Text>
        </Stack>
        <Stack
          direction={isVertical ? 'column' : 'row'}
          align={'center'}
          spacing={4}
        >
          <Text
            flex={1}
            fontSize="sm"
            fontWeight="medium"
            color={'primary.500'}
            noOfLines={1}
            whiteSpace="pre"
          >
            {time}
            {topic.publisher}
          </Text>

          <Stack border={0} fontSize="sm" direction="row" spacing={'2'}>
            <ActionButton
              onClick={() => onView()}
              icon={<AiOutlineEye />}
              title="View"
              isVertical={isVertical}
              variant="ghost"
            />
            <ActionButton
              onClick={() => onShare()}
              icon={<AiOutlineShareAlt />}
              title="Share"
              isVertical={isVertical}
              variant="ghost"
            />
            <ActionButton
              onClick={() => onBookmark()}
              icon={<BsBookmarkHeart color={isBookmarked ? 'white' : ''} />}
              title="Add Bookmark"
              isVertical={isVertical}
              variant={isBookmarked ? 'solid' : 'ghost'}
              colorScheme={isBookmarked ? 'blue' : ''}
            />
            <ActionButton
              onClick={() => onRecommend()}
              icon={<AiOutlineLike />}
              title="Recommend"
              isVertical={isVertical}
              disabled={topic.isRecommended || isLoading}
              variant={topic.isRecommended ? 'solid' : 'ghost'}
              colorScheme={topic.isRecommended ? 'green' : ''}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
