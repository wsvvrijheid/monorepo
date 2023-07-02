import { FC } from 'react'

import { AspectRatio, Box, useBoolean } from '@chakra-ui/react'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'

type VideoPlayerProps = {
  ratio?: number
  url: string
  light?: string
}

const VideoPlayer: FC<VideoPlayerProps> = ({ ratio = 16 / 9, url, light }) => {
  const [isPlaying, setIsPlaying] = useBoolean(false)

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
        url={url}
        width="100%"
        height="100%"
        light={light}
        playIcon={<Box boxSize={12} color="whiteAlpha.700" as={FaPlayCircle} />}
      />
    </AspectRatio>
  )
}

export default VideoPlayer
