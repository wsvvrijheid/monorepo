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
import { StrapiLocale } from '@wsvvrijheid/types'
import { useTrends } from '@wsvvrijheid/utils'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaInfoCircle } from 'react-icons/fa'

import { timeLocale, useFindHashtagInTrends } from '../../hooks'
import { TrendList } from './TrendList'

export const TrendListTabs = () => {
  const { t } = useTranslation(['post'])
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
        <Text fontSize="sm">{t`post.trends-label`}</Text>

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

      <Box overflowY="auto" shadow="primary" bg="white">
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
