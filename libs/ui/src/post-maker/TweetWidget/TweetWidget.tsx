import { Box, Image, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { Tweet } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'

import { TweetCardBase } from '../../admin/TweetCard'

interface TweetWidgetProps {
  title: string
  tweets?: Tweet[] | null
}

export const TweetWidget = ({
  title,
  tweets,
}: TweetWidgetProps): JSX.Element => {
  const { t } = useTranslation('post')

  return (
    <VStack align="stretch" justify="stretch" h={640}>
      <Text color="gray.500" fontSize="sm">
        {title}
      </Text>
      <Box bg="white" p={4} overflow="auto" shadow="base">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {tweets && tweets.length > 0 ? (
            tweets.map((tweet, index) => {
              return <TweetCardBase key={index} tweet={tweet} />
            })
          ) : (
            <Stack textAlign="center">
              <Image
                src="https://api.samenvvv.nl/uploads/tweet_widget_9eb09caf22.svg"
                alt="no tweets"
              />
              <Text>{t('post.no-tweet')}</Text>
            </Stack>
          )}
        </VStack>
      </Box>
    </VStack>
  )
}
