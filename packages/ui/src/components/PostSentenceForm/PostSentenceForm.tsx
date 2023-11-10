import { FC, useState } from 'react'

import { HStack, IconButton, Stack, Textarea } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPlus } from 'react-icons/fa'

import {
  useCreateHashtagSentence,
  useGetHashtagSentences,
} from '@wsvvrijheid/services'

import { PostSentenceFormItem } from './PostSentenceFormItem'
import { PostSentenceFormProps } from './types'

export const PostSentenceForm: FC<PostSentenceFormProps> = ({
  id,
  hashtag,
}) => {
  const hashtagSentences = useGetHashtagSentences(hashtag?.id) ?? []
  const sentences = hashtagSentences?.[id] ?? []

  const queryClient = useQueryClient()

  const [value, setValue] = useState('')

  const onAddMutation = useCreateHashtagSentence()

  const handleAdd = () => {
    onAddMutation.mutate(
      { hashtagId: hashtag.id, value: `${value}::${id}::${0}::${0}` },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ['kv-hashtag-sentences', hashtag.id],
          }),
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

      {sentences.map(s => {
        const { value, shareCount, isPublished, index } = s

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
