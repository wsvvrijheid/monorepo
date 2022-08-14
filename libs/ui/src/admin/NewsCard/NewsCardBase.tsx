import React, { FC } from 'react'

import {
  ButtonGroup,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

import ActionButton from './ActionButton'
import { NewsCardProps } from './types'

export const NewsCardBase: FC<NewsCardProps> = ({
  isFeatured,
  news,
  variant = 'horizontal',
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
      align="flex-start"
      direction={isVertical ? 'column-reverse' : 'row'}
      overflow="hidden"
    >
      <Stack spacing={4} padding={8} flex={1}>
        <VStack>
          <Text fontSize="18px" lineHeight={7} fontWeight="semibold">
            {news.title}
          </Text>

          {isFeatured && (
            <Text
              fontSize="16px"
              fontWeight="normal"
              noOfLines={isVertical ? 3 : 2}
            >
              {news.description}
            </Text>
          )}
        </VStack>
        <Stack
          direction={isVertical ? 'column' : 'row'}
          align={'center'}
          spacing={4}
        >
          <HStack
            align="flex-start"
            flex={1}
            fontSize="12px"
            color={'blue.500'}
          >
            <Text>{news.date} </Text>
            <Text>-</Text>
            <Text> {news.owner} </Text>
          </HStack>

          <ButtonGroup
            border={0}
            variant="ghost"
            colorScheme="primary"
            fontSize="12px"
            size={isVertical ? 'md' : 'sm'}
          >
            <ActionButton
              onClick={() => alert(news.url)}
              icon={<AiOutlineEye />}
              title="View"
              isVertical={isVertical}
            />
            <ActionButton
              onClick={() => alert('Recommend')}
              icon={<AiOutlineLike />}
              title="Recommend"
              isVertical={isVertical}
            />
            <ActionButton
              onClick={() => alert('Share')}
              icon={<AiOutlineShareAlt />}
              title="Share"
              isVertical={isVertical}
            />
            <ActionButton
              onClick={() => alert('Read Later')}
              icon={<BsBookmarkHeart />}
              title="Read Later"
              isVertical={isVertical}
            />
          </ButtonGroup>
        </Stack>
      </Stack>

      <Image
        w={isVertical ? 'full' : '300px'}
        h={isVertical ? '150px' : 'auto'}
        objectFit="cover"
        objectPosition="center"
        src={news.image}
        alt={news.title}
      />
    </Stack>
  )
}
