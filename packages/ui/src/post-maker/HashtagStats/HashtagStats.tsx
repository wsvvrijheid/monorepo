import { Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useHashtagContext } from '../HashtagProvider'

export const HashtagStats = () => {
  const { hashtagStats } = useHashtagContext()

  const { t } = useTranslation()

  return (
    <Stack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats.totalSentences}</Text>
        <Text>{t('post.total-content')}</Text>
      </VStack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats.unsharedCount}</Text>
        <Text>{t('post.remaining-content')}</Text>
      </VStack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats.totalShares}</Text>
        <Text>{t('post.total-shares')}</Text>
      </VStack>
    </Stack>
  )
}
