import { FC, useState } from 'react'

import { HStack, IconButton, Textarea, Tooltip } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPencilAlt, FaSave, FaTimes } from 'react-icons/fa'
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'

import {
  useDeletePostSentence,
  useUpdatePostSentence,
} from '@wsvvrijheid/services'

import { PostSentenceFormItemProps } from './types'
import { WConfirm, WConfirmProps } from '../WConfirm'

export const PostSentenceFormItem: FC<PostSentenceFormItemProps> = ({
  id,
  index,
  sentence: defaultSentence,
  shareCount,
  isPublished,
}) => {
  const [value, setValue] = useState(defaultSentence)
  const [editMode, setEditMode] = useState(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const queryClient = useQueryClient()

  const onUpdateMutation = useUpdatePostSentence()

  const onDeleteMutation = useDeletePostSentence()

  const isChanged = value !== defaultSentence

  const onSuccess = async () => {
    await queryClient.invalidateQueries(['kv-posts', id])
    setEditMode(false)
  }

  const handleUpdate = () => {
    onUpdateMutation.mutate(
      { id, index, value: `${value}::${shareCount}::${isPublished ? 1 : 0}` },
      { onSuccess },
    )
  }

  const handleDelete = () => {
    setConfirmState({
      title: 'Delete sentence',
      description: 'Are you sure you want to delete this sentence?',
      buttonText: 'Delete',
      isWarning: true,
      onConfirm: () => {
        onDeleteMutation.mutate(
          { id, value: `${value}::${shareCount}::${isPublished ? 1 : 0}` },
          { onSuccess },
        )
        setConfirmState(undefined)
      },
    })
  }

  const handlePublish = (approve: 0 | 1) =>
    onUpdateMutation.mutate(
      {
        id,
        index,
        value: `${value}::${shareCount}::${approve}`,
      },
      { onSuccess },
    )

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <HStack>
        <Textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          flex={1}
          isDisabled={!editMode}
        />
        {editMode && (
          <Tooltip label="Save" placement="top">
            <IconButton
              aria-label={'approve'}
              colorScheme={'green'}
              icon={<FaSave />}
              isDisabled={!isChanged}
              isRound
              onClick={handleUpdate}
              size={'sm'}
            />
          </Tooltip>
        )}

        {!editMode && (
          <Tooltip label="Edit" placement="top">
            <IconButton
              aria-label={'edit'}
              colorScheme={'gray'}
              icon={<FaPencilAlt />}
              isRound
              onClick={() => setEditMode(true)}
              size={'sm'}
            />
          </Tooltip>
        )}

        <Tooltip label={isPublished ? 'Unpublish' : 'Publish'} placement="top">
          <IconButton
            aria-label={'default'}
            colorScheme={isPublished ? 'yellow' : 'purple'}
            icon={
              isPublished ? (
                <MdOutlineUnpublished />
              ) : (
                <MdOutlinePublishedWithChanges />
              )
            }
            isRound
            onClick={() => handlePublish(isPublished ? 0 : 1)}
            size={'sm'}
          />
        </Tooltip>

        <Tooltip label="Delete" placement="top">
          <IconButton
            aria-label={'delete'}
            colorScheme={'red'}
            icon={<FaTimes />}
            isRound
            onClick={handleDelete}
            size={'sm'}
          />
        </Tooltip>
      </HStack>
    </>
  )
}
