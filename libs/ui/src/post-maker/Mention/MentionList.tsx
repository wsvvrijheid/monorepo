import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

import { useHashtagContext } from '@wsvvrijheid/context'
import { MentionUserData } from '@wsvvrijheid/types'

import { MentionListPanel } from './MentionListPanel'

const MentionListItem = dynamic(() => import('./MentionListItem'), {
  ssr: false,
})

export const MentionList = () => {
  const {
    data,
    activePostId,
    savedMentions,
    removeStoredMention,
    addMentionToPost,
  } = useHashtagContext()
  const { t } = useTranslation()
  const onAddMention = (value: MentionUserData) => {
    if (value.screen_name && activePostId) {
      addMentionToPost(activePostId, value.screen_name)
    }
  }
  const onRemoveMention = (value: MentionUserData) => {
    if (value.screen_name) {
      removeStoredMention(value.screen_name)
    }
  }

  if (!data) return null

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
          colorScheme={'primary'}
          isFitted
          variant="line"
          bg="white"
        >
          <TabList pos="sticky" top="0" bg="white">
            <Tab>{t('post.mention-tab-popular')}</Tab>
            <Tab>{t('post.mention-tab-saved')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <MentionListPanel />
            </TabPanel>
            <TabPanel p={0}>
              {savedMentions?.map((data, i) => (
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
