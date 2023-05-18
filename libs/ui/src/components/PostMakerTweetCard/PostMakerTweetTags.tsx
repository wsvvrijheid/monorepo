import { Stack, Tag, TagCloseButton, TagLabel, Wrap } from '@chakra-ui/react'

import { useHashtagContext, usePostContext } from '@wsvvrijheid/context'

export const PostMakerTweetTags = ({ id }: { id: number }) => {
  const { post } = usePostContext(id)
  const { removeMentionFromPost, removeTrendFromPost } = useHashtagContext()

  return (
    <Stack>
      <Wrap>
        {post.mentionUsernames.map(mention => (
          <Tag
            key={mention}
            colorScheme={'primary'}
            variant={'outline'}
            rounded={'full'}
            px={2}
          >
            <TagLabel>@{mention}</TagLabel>
            <TagCloseButton
              onClick={() => removeMentionFromPost(id, mention)}
            />
          </Tag>
        ))}
      </Wrap>
      <Wrap>
        {post.trendNames.map(trend => (
          <Tag key={trend} variant={'outline'} rounded={'full'} px={2}>
            <TagLabel>{trend}</TagLabel>
            <TagCloseButton onClick={() => removeTrendFromPost(id, trend)} />
          </Tag>
        ))}
      </Wrap>
    </Stack>
  )
}
