import { FC, useState } from 'react'

import { HStack, IconButton, Stack, Textarea } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPlus } from 'react-icons/fa'

import {
  useCreatePostSentence,
  useGetPostSentences,
} from '@wsvvrijheid/services'

import { PostSentenceFormItem } from './PostSentenceFormItem'
import { PostSentenceFormProps } from './types'

export const PostSentenceForm: FC<PostSentenceFormProps> = ({ id }) => {
  const sentences = useGetPostSentences(id ?? 0)

  const queryClient = useQueryClient()

  const [value, setValue] = useState('')

  const onAddMutation = useCreatePostSentence()

  const handleAdd = () => {
    onAddMutation.mutate(
      { id, value: `${value}::${0}::${0}` },
      {
        onSuccess: () => queryClient.invalidateQueries(['kv-posts', id]),
      },
    )
    setValue('')
  }

  return (
    <Stack p={4} spacing={4}>
      <HStack>
        <Textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Add sentence"
        />
        <IconButton
          aria-label="Add sentence"
          icon={<FaPlus />}
          onClick={handleAdd}
        />
      </HStack>

      {sentences.map((s, index) => {
        const { value, shareCount, isPublished } = s

        return (
          <PostSentenceFormItem
            key={index}
            id={id}
            index={index}
            sentence={value}
            shareCount={Number(shareCount)}
            isPublished={isPublished}
          />
        )
      })}
    </Stack>
  )
}
