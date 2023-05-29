import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useHashtag } from '@wsvvrijheid/services'

import { useHashtagContext } from './HashtagProvider'
import { TrendListTabs } from './Trends'
import { TweetWidget } from './TweetWidget'

export const TimelineTrendsTabs = () => {
  const { t } = useTranslation()

  const hashtag = useHashtag()

  if (!hashtag) return null

  return (
    <Stack h={780} data-tour="step-trends">
      <Box overflowY="auto" bg="white">
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList pos="sticky" top="0" bg="white">
            <Tab>Timeline</Tab>
            <Tab>{t('post.trends-label')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TweetWidget
                title={t('post.latest-tweets-label')}
                tweets={hashtag?.tweets}
              />
            </TabPanel>
            <TabPanel>
              <TrendListTabs />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  )
}
