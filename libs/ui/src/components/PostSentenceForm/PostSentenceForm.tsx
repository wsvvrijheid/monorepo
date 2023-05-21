import { FC, FormEventHandler, useState } from 'react'

import { HStack, IconButton, Input, Stack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPlus } from 'react-icons/fa'

import {
  useCreatePostSentence,
  useGetPostSentences,
} from '@wsvvrijheid/services'

import { PostSentenceFormItem } from './PostSentenceFormItem'
import { PostSentenceFormProps } from './types'

export const PostSentenceForm: FC<PostSentenceFormProps> = ({ id }) => {
  const { data } = useGetPostSentences(id ?? 0)

  const queryClient = useQueryClient()

  const [value, setValue] = useState('')

  const onAddMutation = useCreatePostSentence()

  const handleAdd: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    onAddMutation.mutate(
      { id, value: `${value}::0` },
      {
        onSuccess: () => queryClient.invalidateQueries(['kv-posts', id]),
      },
    )
    setValue('')
  }

  return (
    <Stack p={4} spacing={4}>
      <form onSubmit={handleAdd}>
        <HStack>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Add sentence"
          />
          <IconButton
            aria-label="Add sentence"
            icon={<FaPlus />}
            type={'submit'}
          />
        </HStack>
      </form>
      {data?.map((sentence, index) => {
        const [value, shareCount] = sentence.split('::')

        return (
          <PostSentenceFormItem
            key={index}
            id={id}
            index={index}
            sentence={value}
            shareCount={Number(shareCount)}
          />
        )
      })}
    </Stack>
  )
}
