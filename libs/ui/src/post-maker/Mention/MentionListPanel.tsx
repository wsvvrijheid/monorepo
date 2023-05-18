import { Box } from '@chakra-ui/react'

import { useHashtagContext } from '@wsvvrijheid/context'
import { MentionUserData } from '@wsvvrijheid/types'

import MentionListItem from './MentionListItem'
import { MentionListSkeleton } from './MentionListSkeleton'
import { MentionSearch } from './MentionSearch'

export const MentionListPanel = () => {
  const {
    activePostId,
    searchMentionsQuery,
    data,
    addMentionToPost,
    updateStoredMentions,
  } = useHashtagContext()

  const onAddUserMention = (value: MentionUserData) => {
    if (activePostId) {
      addMentionToPost(activePostId, value.screen_name)
    }
    updateStoredMentions(value)
    // clearMentionSearches()
  }

  const content = () => {
    if (searchMentionsQuery.isLoading) {
      return <MentionListSkeleton />
    }

    if (searchMentionsQuery.data?.length) {
      return searchMentionsQuery.data.map((data, i) => (
        <MentionListItem key={i} data={data} onAddItem={onAddUserMention} />
      ))
    }

    return data?.mentions?.map(({ data }, i) => (
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
