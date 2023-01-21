import { FC } from 'react'

import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { RecommendedTweet, StrapiModel } from '@wsvvrijheid/types'
import { formatDistanceToNow } from 'date-fns'
import twitterText from 'twitter-text'

import { TweetTextProps } from './types'
import { WImage } from '../../components'
import { ModelImage } from '../ModelForm/ModelImage'

export const TweetText: FC<TweetTextProps> = ({
  tweet,
  isVertical = true,
  isChangingImage,
  setIsChangingImage,
  setValue,
}) => {
  if (!tweet) return null

  const recommendedTweet = tweet as unknown as RecommendedTweet
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
              isChangingImage={recommendedTweet?.media ? isChangingImage : true}
              setIsChangingImage={setIsChangingImage}
            />
          </Box>
        ) : (
          recommendedTweet?.media?.url && (
            <Box mt={2} boxSize={'full'}>
              <WImage
                src={recommendedTweet.media.url}
                alt={recommendedTweet.text}
                rounded={'md'}
              />
            </Box>
          )
        )}
      </SimpleGrid>
      {recommendedTweet?.updatedAt && (
        <Text fontSize={'sm'} color={'gray.500'} textAlign={'right'}>
          {formatDistanceToNow(new Date(recommendedTweet.updatedAt as string), {
            addSuffix: true,
          })}
        </Text>
      )}
    </Stack>
  )
}
