import { Box } from '@chakra-ui/react'

import { useHashtag, useLookupTwitterUsers } from '@fc/services'
import { MentionUserData } from '@fc/types'

import MentionListItem from './MentionListItem'
import { MentionListSkeleton } from './MentionListSkeleton'
import { MentionSearch } from './MentionSearch'
import { useHashtagContext } from '../HashtagProvider'

export const MentionListPanel = () => {
  const {
    mentionSearchKey,
    activePostId,
    addMentionToPost,
    updateStoredMentions,
  } = useHashtagContext()

  const hashtag = useHashtag()

  const onAddUserMention = (value: MentionUserData) => {
    if (activePostId) {
      addMentionToPost(activePostId, value.screen_name)
    }
    updateStoredMentions(value)
    // clearMentionSearches()
  }

  const searchMentionsQuery = useLookupTwitterUsers(mentionSearchKey)

  const content = () => {
    if (searchMentionsQuery.isFetching) {
      return <MentionListSkeleton />
    }

    if (searchMentionsQuery.data?.length && mentionSearchKey.length > 2) {
      return searchMentionsQuery.data.map((data, i) => (
        <MentionListItem key={i} data={data} onAddItem={onAddUserMention} />
      ))
    }

    return hashtag.mentions?.map(({ data }, i) => (
      <MentionListItem key={i} data={data} onAddItem={onAddUserMention} />
    ))
  }

  return (
    <Box>
      <Box pos="sticky" top="31px">
        <MentionSearch />
      </Box>
      {content()}
    </Box>
  )
}
