import { FC } from 'react'

import { ButtonGroup, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

import { WImage } from '../../components'
import { ActionButton } from './index'
import { TopicCardBaseProps } from './index'

export const TopicCardBase: FC<TopicCardBaseProps> = ({
  hideDescription,
  topic,
  variant = 'vertical',
  onBookmark,
  onRecommend,
  onShare,
  onView,
  isBookmarked,
}) => {
  const isVertical = useBreakpointValue({
    base: true,
    lg: variant === 'vertical' ? true : false,
  })
  return (
    <Stack
      h={isVertical ? 'auto' : '200px'}
      boxShadow="md"
      rounded="md"
      align={isVertical ? 'stretch' : 'flex-start'}
      direction={isVertical ? 'column-reverse' : 'row'}
      overflow="hidden"
    >
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

          {!hideDescription && (
            <Text noOfLines={isVertical ? 3 : 2}>{topic.description}</Text>
          )}
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
          >
            {topic.date} - {topic.publisher}
          </Text>

          <ButtonGroup
            border={0}
            variant="ghost"
            colorScheme="primary"
            fontSize="sm"
            size={isVertical ? 'md' : 'sm'}
          >
            <ActionButton
              onClick={() => onView()}
              icon={<AiOutlineEye />}
              title="View"
              isVertical={isVertical}
            />
            <ActionButton
              onClick={() => onRecommend()}
              icon={<AiOutlineLike />}
              title="Recommend"
              isVertical={isVertical}
            />
            <ActionButton
              onClick={() => onShare()}
              icon={<AiOutlineShareAlt />}
              title="Share"
              isVertical={isVertical}
            />
            <ActionButton
              onClick={() => onBookmark()}
              icon={<BsBookmarkHeart color={isBookmarked ? 'red' : ''} />}
              title="Read Later"
              isVertical={isVertical}
            />
          </ButtonGroup>
        </Stack>
      </Stack>

      <WImage
        w={isVertical ? 'full' : '300px'}
        h={isVertical ? '200px' : 'full'}
        src={topic.imageUrl}
        alt={topic.title}
      />
    </Stack>
  )
}
