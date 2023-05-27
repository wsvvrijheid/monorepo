import { Stack, Text, VStack } from '@chakra-ui/react'

import { useHashtagContext } from '../HashtagProvider'

export const HashtagStats = () => {
  const { hashtagStats } = useHashtagContext()

  return (
    <Stack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats.totalSentences}</Text>
        <Text>Total uniq content</Text>
      </VStack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats.totalShares}</Text>
        <Text>Total shares</Text>
      </VStack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats.unsharedCount}</Text>
        <Text>Unshared content left</Text>
      </VStack>
    </Stack>
  )
}
