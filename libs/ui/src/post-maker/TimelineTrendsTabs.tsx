import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useHashtagContext } from './HashtagProvider'
import { TrendListTabs } from './Trends'
import { TweetWidget } from './TweetWidget'

export const TimelineTrendsTabs = () => {
  const { t } = useTranslation()

  const { data: hashtag } = useHashtagContext()

  if (!hashtag) return null

  return (
    <Stack h={780} data-tour="step-trends">
      <Box overflowY="auto" bg="white">
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList pos="sticky" top="0" bg="white">
            <Tab>Timeline</Tab>
            {hashtag?.tweets?.length}
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
