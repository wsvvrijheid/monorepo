import { FC, useState } from 'react'

import { AspectRatio, Box, useBoolean } from '@chakra-ui/react'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import { getMediaUrl } from '@wsvvrijheid/utils'

type VideoPlayerProps = {
  ratio?: number
  url: string
  light?: string
}

const VideoPlayer: FC<VideoPlayerProps> = ({ ratio = 16 / 9, url, light }) => {
  const [isPlaying, setIsPlaying] = useBoolean(false)
  const [fallbackUrl, setFallbackUrl] = useState<string>()

  return (
    <AspectRatio
      ratio={ratio}
      w="full"
      rounded={'lg'}
      overflow="hidden"
      onClick={setIsPlaying.toggle}
    >
      <ReactPlayer
        playing={isPlaying}
        url={fallbackUrl || url}
        width="100%"
        height="100%"
        light={light}
        onError={() => {
          const fallback = getMediaUrl(url, true)
          setFallbackUrl(fallback)
        }}
        playIcon={<Box boxSize={12} color="whiteAlpha.700" as={FaPlayCircle} />}
      />
    </AspectRatio>
  )
}

export default VideoPlayer
