import { FC } from 'react'

import { Box, Text, Stack } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import twitterText from 'twitter-text'

import { WImage } from '../../components'
import { TweetTextProps } from './types'

export const TweetText: FC<TweetTextProps> = ({ tweet }) => {
  return (
    <Stack spacing={4}>
      <Text
        ml={2}
        wordBreak={'break-word'}
        whiteSpace={'pre-wrap'}
        sx={{
          '& a': {
            color: 'twitter.500',
          },
        }}
        dangerouslySetInnerHTML={{ __html: twitterText.autoLink(tweet.text) }}
      />
      {tweet?.media?.url && (
        <Box mt={2}>
          <WImage
            ratio="twitter"
            src={tweet?.media?.url}
            rounded={'lg'}
            alt={tweet.text}
          />
        </Box>
      )}
      <Text fontSize={'sm'} color={'gray.500'} textAlign={'right'}>
        {formatDistanceToNow(new Date(tweet.created_at as string), {
          addSuffix: true,
        })}
      </Text>
    </Stack>
  )
}
