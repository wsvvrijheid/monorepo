import { FC } from 'react'

import {
  Box,
  ButtonGroup,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRecommendTopic } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Post, TopicBase } from '@wsvvrijheid/types'
import { formatDistanceStrict } from 'date-fns'
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'
import { useLocalStorage } from 'usehooks-ts'

import { ActionButton } from './ActionButton'
import { TopicCardProps } from './types'
import { WImage } from '../../components'
import { ShareButtons } from '../../components'
import { postFields, postSchema } from '../../data'
import { ModelCreateModal } from '../ModelForm'

const domains = [
  'aktifhaber.com',
  'turkishminute.com',
  'api.samenvvv.nl',
  'pbs.twimg.com',
  'api.wsvvrijheid.nl',
  'admin.wsvvrijheid.nl',
  'localhost',
  'amnesty.imgix.net',
  'boldmedya.com',
  'dekanttekening.nl',
  'cdn.nos.nl',
  'rtlnieuws.nl',
  'image.writeclouds.com',
  'tr724.com',
  'images0.persgroep.net',
  'image.shaber3.com',
  'ipa.news',
  'static.wixstatic.com',
  'amnesty.org',
]

export const TopicCard: FC<TopicCardProps> = ({ topic, onCreatePost }) => {
  const { user } = useAuthSelector()
  const ImageComponent = domains.some(d => topic.image?.includes(d))
    ? WImage
    : Image

  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  const time = topic.time
    ? formatDistanceStrict(new Date(topic.time), new Date()) + ' - '
    : ''

  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<TopicBase[]>(
    'bookmarks',
    [],
  )

  const queryClient = useQueryClient()

  const toast = useToast()
  const { mutate, isLoading } = useRecommendTopic()

  const isBookmarked = bookmarksStorage?.some(t => t.url === topic.url)

  const handleBookmark = () => {
    if (isBookmarked) {
      const filteredBookmarks = bookmarksStorage?.filter(
        t => t.url !== topic.url,
      )
      setBookmarksStorage(filteredBookmarks)
    } else {
      const newBookmarks = [...(bookmarksStorage || []), topic]
      setBookmarksStorage(newBookmarks)
    }
  }

  const handleRecommend = () => {
    mutate(
      {
        ...topic,
        recommender: user?.id as number,
      },
      { onSettled: () => queryClient.invalidateQueries(['topics']) },
    )
    toast({
      title: 'Recommended',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  const handleView = () => {
    window.open(
      topic.url,
      '_blank, popupWindow',
      `height=500,width=800,left=${window.innerWidth / 3},top=${
        window.innerHeight / 2
      },resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, status=yes`,
    )
  }

  const postContent = {
    title: topic?.title,
    description: topic?.description,
    content: topic?.description,
    reference: topic?.url,
    image: {
      url: topic?.image,
    },
  } as Post

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
        <ImageComponent
          w={isVertical ? '100%' : '300px'}
          h={isVertical ? '200px' : '100%'}
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
          >
            {time}
            {topic.publisher}
          </Text>

          <ButtonGroup size={'sm'}>
            <ModelCreateModal
              title="Create Post"
              url="api/posts"
              schema={postSchema}
              fields={postFields}
              model={postContent}
              buttonProps={{
                variant: 'ghost',
                colorScheme: 'gray',
              }}
            >
              {isVertical ? '' : 'Create Post'}
            </ModelCreateModal>
            <ActionButton
              onClick={() => handleView()}
              icon={<AiOutlineEye />}
              title="View"
              isVertical={isVertical}
              variant="ghost"
            />

            <Popover placement="top">
              <PopoverTrigger>
                <Box>
                  <ActionButton
                    onClick={() => null}
                    icon={<AiOutlineShareAlt />}
                    title="Share"
                    isVertical={isVertical}
                    variant="ghost"
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent w="max-content">
                <PopoverArrow />
                <PopoverBody>
                  <ShareButtons
                    title={topic.title}
                    url={topic.url}
                    quote={topic.description || ''}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <ActionButton
              onClick={() => handleBookmark()}
              icon={<BsBookmarkHeart color={isBookmarked ? 'white' : ''} />}
              title={isBookmarked ? 'Remove' : 'Add Bookmark'}
              isVertical={isVertical}
              variant={isBookmarked ? 'solid' : 'ghost'}
              colorScheme={isBookmarked ? 'red' : 'gray'}
            />
            {user && (
              <ActionButton
                onClick={() => handleRecommend()}
                icon={<AiOutlineLike />}
                title="Recommend"
                isVertical={isVertical}
                disabled={topic.isRecommended || isLoading}
                variant={topic.isRecommended ? 'solid' : 'ghost'}
                colorScheme={topic.isRecommended ? 'green' : 'gray'}
              />
            )}
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}
