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
import { Localize, RecommendedTweet } from '@wsvvrijheid/types'
import { AiFillDelete, AiOutlineShareAlt } from 'react-icons/ai'
import { IconType } from 'react-icons/lib'
import { RiEditLine } from 'react-icons/ri'

import { ShareButtons, WConfirm, WConfirmProps } from '../../components'
import { ActionButton } from '../TopicCard'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string>
}

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
    console.log('delete id ', id)
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
      <Tooltip label="update tweet" hasArrow bg="primary.400">
        <Box>
          <ActionButton
            onClick={() => null}
            icon={<RiEditLine />}
            title="Update"
            isVertical={isVertical}
            variant="ghost"
          />
        </Box>
      </Tooltip>

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
              title={tweet?.text}
              url={tweet?.originalTweet?.media?.url}
              quote={tweet?.text || ''}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Tooltip label="delete tweet" hasArrow bg="primary.400">
        <Box>
          <ActionButton
            onClick={onDelete}
            icon={<AiFillDelete />}
            title="Delete"
            isVertical={isVertical}
            variant="ghost"
          />
        </Box>
      </Tooltip>
    </HStack>
  )
}
