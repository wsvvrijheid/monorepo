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

import {
  ShareButtons,
  SocialItem,
  WConfirm,
  WConfirmProps,
} from '../../components'
import { ActionButton } from '../TopicCard'

export interface RecommendedSocialButtonsProps {
  items?: SocialItem[]
  tweet: RecommendedTweet
  isVertical?: boolean | undefined
}

export const RecommendedSocialButtons: FC<RecommendedSocialButtonsProps> = ({
  //items,
  tweet,
  isVertical,
}) => {
  //const { locale } = useRouter()
  const deleteModelMutation = useDeleteModel('api/recommended-tweets')
  const [confirmState, setConfirmState] = useState<WConfirmProps>()
  const id = tweet?.id

  const handleSuccess = () => {
    // onSuccess?.()
    //  setIsEditing.off()
    //setIsChangingImage.off()
    setConfirmState(undefined)
  }

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
            onSuccess: handleSuccess,
            onError: async errors => {
              console.log('error delete mutation', errors)
            },
          },
        )
        setConfirmState(undefined)
      },
    })
  }

  const getMentions = () => {
    let mentions = ''

    tweet?.mentions?.map(mention => {
      mentions = mentions + ' @' + mention?.username
    })
    return mentions
  }
  const mentions = getMentions()

  console.log('mentions', mentions)

  const quoteTweet = tweet?.text + ' @' + tweet?.mentions[0]?.username || ''

  //const { data: trends, isLoading } = useTrends()
  //console.log('treds >>>', 'locale', locale, trends?.[locale]?.name)
  return (
    <HStack
      //align="start"
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
      {/* <Tooltip label="update tweet" hasArrow bg="primary.400">
        <Box>
          <ActionButton
            onClick={() => null}
            icon={<RiEditLine />}
            title="Update"
            isVertical={isVertical}
            variant="ghost"
          />
        </Box>
      </Tooltip> */}

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
              // title={tweet?.text}
              url={tweet?.originalTweet?.media?.url}
              quote={quoteTweet}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Tooltip label="delete tweet" hasArrow bg="primary.400">
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
