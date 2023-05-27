import { FC } from 'react'

import {
  AspectRatio,
  Box,
  SimpleGrid,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import twitterText from 'twitter-text'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { RecommendedTweet, StrapiModel } from '@wsvvrijheid/types'

import { TweetContentProps } from './types'
import { WImage } from '../../components'
import { ModelImage } from '../ModelForm/ModelImage'

export const TweetContent: FC<TweetContentProps> = ({
  tweet,
  horizontal,
  isChangingImage,
  setIsChangingImage,
  setValue,
}) => {
  const [isPlaying, setIsPlaying] = useBoolean()

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
          dangerouslySetInnerHTML={{ __html: twitterText.autoLink(tweet.text) }}
        />
        <Box boxSize={'full'}>
          {setValue && isChangingImage != null && setIsChangingImage ? (
            <ModelImage
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
                <AspectRatio
                  ratio={16 / 9}
                  w="full"
                  rounded={'lg'}
                  overflow="hidden"
                  onClick={setIsPlaying.toggle}
                >
                  <ReactPlayer
                    playing={isPlaying}
                    url={tweet.video}
                    width="100%"
                    height="100%"
                    light={tweet.image}
                    playIcon={
                      <Box
                        boxSize={12}
                        color="whiteAlpha.700"
                        as={FaPlayCircle}
                      />
                    }
                  />
                </AspectRatio>
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
