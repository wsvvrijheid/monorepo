import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import {
  addMentionUsername,
  clearSearchedMentions,
  removeSavedMention,
  resetMentions,
  updateSavedSearchedMentions,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/store'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { UserV1 } from 'twitter-api-v2'

import { MentionListSkeleton } from './MentionListSkeleton'
import { MentionSearch } from './MentionSearch'

const MentionListItem = dynamic(() => import('./MentionListItem'), {
  ssr: false,
})

export const MentionList = () => {
  const {
    mentions,
    mentionUsernames,
    isMentionListLoading,
    isSearchedMentionsLoading,
    searchedMentions,
    savedMentions,
  } = useAppSelector(state => state.post)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onAddMention = (value: UserV1) => {
    if (value.screen_name) {
      dispatch(addMentionUsername(value.screen_name))
      dispatch(resetMentions())
    }
  }

  const onRemoveMention = (value: UserV1) => {
    if (value.screen_name) {
      dispatch(removeSavedMention(value.screen_name))
      dispatch(resetMentions())
    }
  }

  const onAddUserMention = (value: UserV1) => {
    onAddMention(value)
    dispatch(updateSavedSearchedMentions(value))
    dispatch(clearSearchedMentions())
  }

  return (
    <VStack align="stretch" h="60%" data-tour="step-mention-list">
      <VStack
        minH="0"
        h="full"
        align="stretch"
        bg="white"
        overflowY="auto"
        shadow="base"
      >
        <Tabs
          size="sm"
          isFitted
          colorScheme="primary"
          variant="line"
          bg="white"
        >
          <TabList pos="sticky" top="0" bg="white">
            <Tab>{t('post.mention-tab-popular')}</Tab>
            <Tab>{t('post.mention-tab-saved')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Box pos="sticky" top="31px">
                <MentionSearch />
              </Box>
              {isSearchedMentionsLoading || isMentionListLoading ? (
                <MentionListSkeleton />
              ) : searchedMentions.length > 0 ? (
                searchedMentions.map((data, i) => (
                  <MentionListItem
                    key={i}
                    data={data}
                    onAddItem={onAddUserMention}
                  />
                ))
              ) : (
                mentions
                  ?.filter(
                    mention =>
                      !mentionUsernames.includes('@' + mention.username),
                  )
                  ?.map(({ data }, i) => (
                    <MentionListItem
                      key={i}
                      data={data as UserV1}
                      onAddItem={onAddMention}
                    />
                  ))
              )}
            </TabPanel>
            <TabPanel p={0}>
              {savedMentions
                .filter(
                  data => !mentionUsernames.includes('@' + data.screen_name),
                )
                ?.map((data, i) => (
                  <MentionListItem
                    key={i}
                    data={data}
                    onRemoveItem={onRemoveMention}
                    onAddItem={onAddMention}
                  />
                ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  )
}
