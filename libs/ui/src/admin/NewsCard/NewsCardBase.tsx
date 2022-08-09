import React, { FC } from 'react'

import { HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'

import ActionButton from './ActionButton'
import { NewsCardProps } from './types'

export const NewsCardBase: FC<NewsCardProps> = ({
  isFeatured,
  isVertical,
  news,
}) => {
  return (
    <Stack
      w={isVertical ? '300px' : '1000px'}
      h={isVertical ? 'auto' : isFeatured ? '208px' : '150px'}
      boxShadow="md"
      rounded="md"
      align="flex-start"
      direction={isVertical ? 'column-reverse' : 'row'}
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
          align={!isVertical ? 'flex-start' : 'center'}
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
          <HStack spacing={4} fontSize="12px" color={'blue.500'}>
            <ActionButton
              onClick={() => alert(news.url)}
              title="View"
              isVertical={isVertical}
              icon={AiOutlineEye}
            />
            <ActionButton
              onClick={() => alert('Recommend')}
              title="Recommend"
              isVertical={isVertical}
              icon={AiOutlineLike}
            />
            <ActionButton
              onClick={() => alert('Share')}
              title="Share"
              isVertical={isVertical}
              icon={AiOutlineShareAlt}
            />
            <ActionButton
              onClick={() => alert('Read Later')}
              title="Read Later"
              isVertical={isVertical}
              icon={BsBookmarkHeart}
            />
          </HStack>
        </Stack>
      </Stack>

      <Image
        width={isVertical ? '100%' : '300px'}
        height={isVertical ? '150px' : '100%'}
        objectFit="cover"
        objectPosition="center"
        marginLeft={isVertical ? '0px' : 'auto'}
        borderTopRightRadius={'md'}
        borderTopLeftRadius={isVertical ? 'md' : '0'}
        borderBottomRightRadius={isVertical ? '0' : 'md'}
        src={news.image}
        alt={news.title}
      />
    </Stack>
  )
}
