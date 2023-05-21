import { FC, useState } from 'react'

import { HStack, IconButton } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaCheck, FaTimes } from 'react-icons/fa'

import {
  useDeletePostSentence,
  useUpdatePostSentence,
} from '@wsvvrijheid/services'

import { PostSentenceFormItemProps } from './types'
import { ContentEditable } from '../ContentEditable'

export const PostSentenceFormItem: FC<PostSentenceFormItemProps> = ({
  id,
  index,
  sentence: defaultSentence,
  shareCount,
}) => {
  const [value, setValue] = useState(defaultSentence)

  const queryClient = useQueryClient()

  const onUpdateMutation = useUpdatePostSentence()

  const onDeleteMutation = useDeletePostSentence()

  const isChanged = value !== defaultSentence.split('::')?.[0]

  const onSuccess = () => queryClient.invalidateQueries(['kv-posts', id])

  const handleUpdate = () => {
    onUpdateMutation.mutate(
      { id, index, value: `${value}::${shareCount}` },
      { onSuccess },
    )
  }

  const handleDelete = () => {
    onDeleteMutation.mutate(
      { id, value: `${value}::${shareCount}` },
      { onSuccess },
    )
  }

  return (
    <HStack>
      <ContentEditable value={value} onUpdate={val => setValue(val)} flex={1} />
      <IconButton
        aria-label={'update'}
        colorScheme={'green'}
        icon={<FaCheck />}
        isDisabled={!isChanged}
        isRound
        onClick={handleUpdate}
        size={'sm'}
      />
      <IconButton
        aria-label={'delete'}
        colorScheme={'red'}
        icon={<FaTimes />}
        isRound
        onClick={handleDelete}
        size={'sm'}
        variant={'outline'}
      />
    </HStack>
  )
}
