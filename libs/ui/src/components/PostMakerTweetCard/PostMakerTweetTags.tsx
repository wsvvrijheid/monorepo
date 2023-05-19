import { Stack, Tag, TagCloseButton, TagLabel, Wrap } from '@chakra-ui/react'

import { useHashtagContext, usePostContext } from '@wsvvrijheid/context'

export const PostMakerTweetTags = () => {
  const { post } = usePostContext()
  const {
    postMentions,
    postTrends,
    removeMentionFromPost,
    removeTrendFromPost,
  } = useHashtagContext()

  if (!post) return null

  const mentionUsernames = postMentions[post.id] ?? []
  const trendNames = postTrends[post.id] ?? []

  return (
    <Stack>
      <Wrap>
        {mentionUsernames.map(mention => (
          <Tag
            key={mention}
            colorScheme={'primary'}
            variant={'outline'}
            rounded={'full'}
            px={2}
          >
            <TagLabel>@{mention}</TagLabel>
            <TagCloseButton
              onClick={() => removeMentionFromPost(post.id, mention)}
            />
          </Tag>
        ))}
      </Wrap>
      <Wrap>
        {trendNames.map(trend => (
          <Tag key={trend} variant={'outline'} rounded={'full'} px={2}>
            <TagLabel>{trend}</TagLabel>
            <TagCloseButton
              onClick={() => removeTrendFromPost(post.id, trend)}
            />
          </Tag>
        ))}
      </Wrap>
    </Stack>
  )
}
