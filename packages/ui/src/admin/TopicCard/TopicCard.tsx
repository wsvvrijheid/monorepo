import { FC, useState } from 'react'

import {
  Box,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { formatDistanceStrict } from 'date-fns'
import { useTranslation } from 'next-i18next'
import {
  AiFillDelete,
  AiOutlineEye,
  AiOutlineLike,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import { BsBookmarkHeart } from 'react-icons/bs'
import { useLocalStorage } from 'usehooks-ts'

import { useAuthContext } from '@wsvvrijheid/context'
import { useDeleteModel, useRecommendTopic } from '@wsvvrijheid/services'
import {
  Post,
  RecommendedTopicCreateInput,
  TopicBase,
} from '@wsvvrijheid/types'

import { ActionButton } from './ActionButton'
import { TopicCardProps } from './types'
import { ShareButtons, WConfirm, WConfirmProps, WImage } from '../../components'
import { useFields, useSchema } from '../../data'
import { useHasPermission } from '../../hooks'
import { FormFields, ModelCreateModal } from '../ModelForm'

export const TopicCard: FC<TopicCardProps> = ({ topic }) => {
  const { user } = useAuthContext()

  const { t } = useTranslation()

  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  const fields = useFields()
  const schemas = useSchema()

  const { getPermission } = useHasPermission()

  const time = topic.time
    ? formatDistanceStrict(new Date(topic.time), new Date()) + ' - '
    : ''

  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<TopicBase[]>(
    'bookmarks',
    [],
  )

  const deleteModelMutation = useDeleteModel('api/recommended-topics')

  const queryClient = useQueryClient()

  const toast = useToast()
  const { mutateAsync, isLoading } = useRecommendTopic()

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

  const handleRecommend = async () => {
    await mutateAsync(topic as RecommendedTopicCreateInput, {
      onSettled: () => queryClient.invalidateQueries(['topics']),
    })
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

  const [confirmState, setConfirmState] = useState<WConfirmProps>()
  const id = topic?.id as number

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete News',
      description: 'Are you sure you want to delete this news?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteModelMutation.mutate(
          { id },
          {
            onSuccess: () => {
              setConfirmState(undefined)
            },
            onError: async errors => {
              console.log('error delete mutation', errors)
            },
          },
        )
        setConfirmState(undefined)
      },
    })
  }

  return (
    <Stack
      h={isVertical ? 'auto' : '200px'}
      boxShadow="md"
      rounded="md"
      align={isVertical ? 'stretch' : 'flex-start'}
      direction={isVertical ? 'column' : 'row'}
      overflow="hidden"
    >
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      {topic.image && (
        <WImage
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
          <Text fontSize="lg" fontWeight={600} noOfLines={1}>
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
            {getPermission(['all']) && (
              <ModelCreateModal<Post>
                title={t('create-post')}
                url="api/posts"
                schema={schemas.posts!}
                fields={fields.posts!}
                model={postContent}
                buttonProps={{
                  variant: 'ghost',
                  colorScheme: 'gray',
                }}
              >
                {isVertical ? '' : t('create-post')}
              </ModelCreateModal>
            )}
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
                isDisabled={topic.isRecommended || isLoading}
                variant={topic.isRecommended ? 'solid' : 'ghost'}
                colorScheme={topic.isRecommended ? 'green' : 'gray'}
              />
            )}
            {user && topic?.isRecommended && id && (
              <Tooltip label="Delete news" hasArrow bg="primary.400">
                <Box>
                  <ActionButton
                    onClick={onDelete}
                    icon={<AiFillDelete color={'red'} />}
                    title="Delete"
                    isVertical={isVertical}
                    variant="ghost"
                  />
                </Box>
              </Tooltip>
            )}
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}
