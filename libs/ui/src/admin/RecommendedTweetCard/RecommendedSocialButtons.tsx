import { FC, useState } from 'react'

import {
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react'
import { useDeleteModel } from '@wsvvrijheid/services'
import { RecommendedTweet } from '@wsvvrijheid/types'
import { AiFillDelete, AiOutlineShareAlt } from 'react-icons/ai'
//import { RiEditLine } from 'react-icons/ri'

import { ShareButtons, WConfirm, WConfirmProps } from '../../components'
import { ActionButton } from '../TopicCard'

export interface RecommendedSocialButtonsProps {
  tweet: RecommendedTweet
  isVertical?: boolean | undefined
}

export const RecommendedSocialButtons: FC<RecommendedSocialButtonsProps> = ({
  tweet,
  isVertical,
}) => {
  const deleteModelMutation = useDeleteModel('api/recommended-tweets')
  const [confirmState, setConfirmState] = useState<WConfirmProps>()
  const id = tweet?.id

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete Tweet',
      description: 'Are you sure you want to delete this tweet?',
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

  const mentions = tweet?.mentions
    ?.map(mention => `@${mention?.username}`)
    .join(' ')
  const quoteTweet = [tweet?.text, mentions].filter(a => !!a).join('\n\n')

  return (
    <HStack
      justify={'space-between'}
      rounded="md"
      align={'space-between'}
      direction={isVertical ? 'column' : 'row'}
      overflow="hidden"
    >
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
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
              // TODO: fix this
              url="https://twitter.com"
              // url={tweet?.originalTweet?.media?.url}
              quote={quoteTweet}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Tooltip label="Delete tweet" hasArrow bg="primary.400">
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
    </HStack>
  )
}
