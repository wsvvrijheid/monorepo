import { FC, useState } from 'react'

import { HStack, IconButton, Stack, Textarea } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPlus } from 'react-icons/fa'

import {
  useCreateHashtagSentence,
  useGetHashtagSentences,
  useHashtag,
} from '@wsvvrijheid/services'

import { PostSentenceFormItem } from './PostSentenceFormItem'
import { PostSentenceFormProps } from './types'
import { usePostContext } from '../../post-maker/PostProvider'

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
    console.log('hashtagId', hashtag.id)
    console.log('id', id)
    onAddMutation.mutate(
      { hashtagId: hashtag.id, value: `${value}::${id}::${0}::${0}` },
      {
        onSuccess: () =>
          queryClient.invalidateQueries(['kv-hashtag-sentences', hashtag.id]),
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
