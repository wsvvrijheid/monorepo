import {
  Box,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTrends } from '@wsvvrijheid/services'
import { StrapiLocale } from '@wsvvrijheid/types'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaInfoCircle } from 'react-icons/fa'

import { TrendList } from './TrendList'
import { useFindHashtagInTrends } from './useFindHashtagsInTrend'
import { timeLocale } from '../../hooks'

export const TrendListTabs = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [hashtagInTrends, hashtagExtraInTrends] = useFindHashtagInTrends()

  const { data: trends, isLoading } = useTrends()

  const distance =
    trends?.updatedAt &&
    formatDistanceToNow(new Date(trends?.updatedAt), {
      locale: timeLocale[locale as StrapiLocale],
      addSuffix: true,
    })

  return (
    <VStack
      w="full"
      align="stretch"
      h="calc(40% - 16px)"
      mt={4}
      data-tour="step-trends"
    >
      <Flex pos="relative" align="start" justify="space-between">
        <Text fontSize="sm">{t('post.trends-label')}</Text>

        <HStack role="group">
          <Box
            color="gray.500"
            fontSize="sm"
            _groupHover={{ opacity: 1 }}
            opacity={0}
          >
            {distance}
          </Box>
          <Box aria-label="updated ago" as={FaInfoCircle} />
        </HStack>
      </Flex>

      <Box overflowY="auto" shadow="base" bg="white">
        <Tabs colorScheme="primary" isFitted size="sm">
          <TabList pos="sticky" top="0" bg="white">
            <Tab>World</Tab>
            <Tab>TR</Tab>
            <Tab>NL</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* TODO Simplify TrendList component */}
              <TrendList
                isLoading={isLoading}
                trends={trends?.en}
                hashtagInTrends={hashtagInTrends?.en}
                hashtagExtraInTrends={hashtagExtraInTrends?.en}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.tr}
                hashtagInTrends={hashtagInTrends?.tr}
                hashtagExtraInTrends={hashtagExtraInTrends?.tr}
              />
            </TabPanel>
            <TabPanel>
              <TrendList
                isLoading={isLoading}
                trends={trends?.nl}
                hashtagInTrends={hashtagInTrends?.nl}
                hashtagExtraInTrends={hashtagExtraInTrends?.nl}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  )
}
