import { FC } from 'react'

import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { RecommendedTweet, StrapiModel } from '@wsvvrijheid/types'
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
  //  console.log('tweet', tweet)
  if (!tweet) return
  const recomendedTweet = tweet as unknown as RecommendedTweet
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
              isChangingImage={recomendedTweet?.media ? isChangingImage : true}
              setIsChangingImage={setIsChangingImage}
            />
          </Box>
        ) : (
          recomendedTweet?.media?.url && (
            <Box mt={2} boxSize={'full'}>
              <WImage
                src={recomendedTweet.media.url}
                alt={recomendedTweet.text}
                rounded={'md'}
              />
            </Box>
          )
        )}
      </SimpleGrid>
      {recomendedTweet?.updatedAt && (
        <Text fontSize={'sm'} color={'gray.500'} textAlign={'right'}>
          {formatDistanceToNow(new Date(recomendedTweet.updatedAt as string), {
            addSuffix: true,
          })}
        </Text>
      )}
    </Stack>
  )
}
