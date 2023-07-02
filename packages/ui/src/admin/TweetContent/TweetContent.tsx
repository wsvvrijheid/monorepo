import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FieldValues } from 'react-hook-form'
import twitterText from 'twitter-text'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { RecommendedTweet, StrapiModel } from '@wsvvrijheid/types'

import { TweetContentProps } from './types'
import { VideoPlayer, WImage } from '../../components'
import { ModelImage } from '../ModelForm/ModelImage'

export const TweetContent = <T extends FieldValues>({
  tweet,
  horizontal,
  isChangingImage,
  setIsChangingImage,
  setValue,
}: TweetContentProps<T>) => {
  if (!tweet) return null

  const originalTweetUrl = (tweet as unknown as RecommendedTweet).originalTweet
    ?.image

  const imageUrl =
    tweet.image && tweet.image.startsWith('http')
      ? tweet.image
      : `${ASSETS_URL}${tweet.image}`

  return (
    <Stack spacing={4}>
      <SimpleGrid columns={{ base: 1, lg: horizontal ? 2 : 1 }} gap={2}>
        <Text
          wordBreak={'break-word'}
          whiteSpace={'pre-wrap'}
          sx={{ '& a': { color: 'twitter.500' } }}
          dangerouslySetInnerHTML={{
            __html: twitterText?.autoLink(tweet?.text || ''),
          }}
        />
        <Box boxSize={'full'}>
          {setValue && isChangingImage != null && setIsChangingImage ? (
            <ModelImage<T>
              isEditing={true}
              model={
                {
                  image: { url: imageUrl || originalTweetUrl },
                } as unknown as StrapiModel
              }
              setValue={setValue}
              isChangingImage={tweet?.image ? isChangingImage : true}
              setIsChangingImage={setIsChangingImage}
            />
          ) : (
            <>
              {/* Video */}
              {tweet.video && (
                <VideoPlayer url={tweet.video} light={tweet.image as string} />
              )}
              {/* Image */}
              {!tweet.video && tweet.image && (
                <WImage
                  hasZoom
                  unoptimized
                  ratio="twitter"
                  src={tweet.image}
                  rounded={'lg'}
                  alt={tweet.text}
                />
              )}
            </>
          )}
        </Box>
      </SimpleGrid>
    </Stack>
  )
}
