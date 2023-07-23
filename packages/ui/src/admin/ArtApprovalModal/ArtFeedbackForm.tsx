import { FC, useState } from 'react'

import { Button, HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import { HiOutlineCheck, HiOutlineX, HiPencil } from 'react-icons/hi'

import { useArtFeedbackMutation } from '@wsvvrijheid/services'

import { ArtFeedbackFormTypes } from './types'
import { WAvatar, WConfirm, WConfirmProps } from '../../components'
import { useHasPermission } from '../../hooks'

export const ArtFeedbackForm: FC<ArtFeedbackFormTypes> = ({
  art,
  editor,
  onSuccess,
  onClose,
  setIsEditing,
}) => {
  const [feedback, setFeedback] = useState('')

  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const feedbackMutation = useArtFeedbackMutation()

  const { getPermission } = useHasPermission()

  const handleSuccess = () => {
    onSuccess?.()
    setConfirmState(undefined)
    onClose?.()
  }

  const handleReject = async () => {
    setConfirmState({
      isWarning: true,
      title: 'Reject art',
      description: 'Are you sure you want to reject this art?',
      buttonText: 'Reject',
      onConfirm: async () => {
        feedbackMutation.mutate(
          {
            art: art.id,
            message: feedback,
            status: 'rejected',
            point: 10,
          },
          { onSuccess: handleSuccess },
        )
      },
    })
  }

  const handleApprove = () => {
    setConfirmState({
      title: 'Approve art',
      description: 'Are you sure you want to approve this art?',
      buttonText: 'Approve',
      onConfirm: async () => {
        feedbackMutation.mutate(
          {
            art: art.id,
            message: feedback,
            status: 'approved',
            point: 10,
          },
          { onSuccess: handleSuccess },
        )
      },
    })
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}

      <Stack w={'full'} spacing={{ base: 2, lg: 4 }}>
        <Text color={'black'} fontWeight={700}>
          Give Feedback
        </Text>
        <HStack align="start" spacing={{ base: 2, lg: 4 }}>
          <WAvatar size="sm" src={editor.avatar} name={editor.name} />

          <Stack flex={1} spacing={{ base: 2, lg: 4 }}>
            <Textarea
              isRequired
              onChange={e => setFeedback(e.target.value)}
              placeholder={'Type your comment here'}
            />

            {getPermission(['arteditor']) && (
              <Stack direction={'row'} spacing={{ base: 2, lg: 4 }}>
                <Button
                  flex={1}
                  flexShrink={0}
                  isDisabled={!feedback || art.approvalStatus === 'rejected'}
                  onClick={handleReject}
                  colorScheme="red"
                  leftIcon={<HiOutlineX />}
                >
                  Reject
                </Button>

                <Button
                  flex={1}
                  flexShrink={0}
                  isDisabled={!feedback || art.approvalStatus === 'approved'}
                  onClick={handleApprove}
                  colorScheme="primary"
                  leftIcon={<HiOutlineCheck />}
                >
                  Approve
                </Button>

                <Button
                  aria-label="Edit"
                  flexShrink={0}
                  onClick={onEdit}
                  colorScheme="primary"
                  leftIcon={<HiPencil />}
                >
                  Edit
                </Button>
              </Stack>
            )}
          </Stack>
        </HStack>
      </Stack>
    </>
  )
}
