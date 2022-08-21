import { Box, Text } from '@chakra-ui/react'
import {
  removeMentionUsername,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/utils'

import { TagList } from '../TagList'

export const PostContainerMentionTags = () => {
  const { mentionUsernames } = useAppSelector(state => state.post)

  const dispatch = useAppDispatch()

  const onRemoveMention = (mention: string) => {
    dispatch(removeMentionUsername(mention))
  }

  if (mentionUsernames.length === 0) return null

  return (
    <Box mb={2}>
      <Text color="gray.500" fontSize="sm">
        Mentions
      </Text>
      <TagList
        tags={mentionUsernames}
        onClickButton={onRemoveMention}
        colorScheme="primary"
      />
    </Box>
  )
}
