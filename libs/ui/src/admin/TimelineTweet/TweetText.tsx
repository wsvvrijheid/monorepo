import { FC } from 'react'

import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { StrapiModel } from '@wsvvrijheid/types'
import { formatDistanceToNow } from 'date-fns'
import twitterText from 'twitter-text'

import { WImage } from '../../components'
import { ModelImage } from '../ModelForm/ModelImage'
import { TweetTextProps } from './types'

export const TweetText: FC<TweetTextProps> = ({
  tweet,
  isVertical = true,
  isChangingImage,
  setIsChangingImage,
  setValue,
}) => {
  return (
    <Stack spacing={4}>
      <SimpleGrid columns={{ base: 1, lg: isVertical ? 1 : 2 }}>
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
        {setValue && isChangingImage != null && setIsChangingImage ? (
          <Box mt={2} boxSize={'full'}>
            <ModelImage
              isEditing={true}
              model={{ image: tweet.media } as unknown as StrapiModel}
              setValue={setValue}
              isChangingImage={tweet?.media ? isChangingImage : true}
              setIsChangingImage={setIsChangingImage}
            />
          </Box>
        ) : (
          tweet?.media?.url && (
            <Box mt={2} boxSize={'full'}>
              <WImage src={tweet.media.url} alt={tweet.text} rounded={'md'} />
            </Box>
          )
        )}
      </SimpleGrid>
      <Text fontSize={'sm'} color={'gray.500'} textAlign={'right'}>
        {formatDistanceToNow(new Date(tweet.created_at as string), {
          addSuffix: true,
        })}
      </Text>
    </Stack>
  )
}
