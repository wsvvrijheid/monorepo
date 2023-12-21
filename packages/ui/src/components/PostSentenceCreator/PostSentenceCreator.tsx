import { useState } from 'react'

import { HStack, IconButton, Textarea, ThemeTypings } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPlus } from 'react-icons/fa'

import { useCreateHashtagSentence } from '@wsvvrijheid/services'

type PostSentenceCreatorProps = {
  hashtagId: number
  postId: number
  initialContent?: string
  colorScheme?: ThemeTypings['colorSchemes']
}

export const PostSentenceCreator = ({
  hashtagId,
  postId,
  initialContent,
  colorScheme,
}: PostSentenceCreatorProps) => {
  const [value, setValue] = useState(initialContent)
  const onAddMutation = useCreateHashtagSentence()
  const queryClient = useQueryClient()

  const handleAdd = () => {
    onAddMutation.mutate(
      { hashtagId, value: `${value}::${postId}::${0}::${0}` },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ['kv-hashtag-sentences', hashtagId],
          }),
      },
    )
    setValue('')
  }

  return (
    <HStack>
      <Textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add sentence"
        bgColor={'whiteAlpha.700'}
      />
      <IconButton
        aria-label="Add sentence"
        icon={<FaPlus />}
        onClick={handleAdd}
        {...(colorScheme && { colorScheme })}
      />
    </HStack>
  )
}
