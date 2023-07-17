import { Box, Button, Center, Stack, Text } from '@chakra-ui/react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { CiImageOff } from 'react-icons/ci'
import { IoMdCloudUpload } from 'react-icons/io'

import { ASSETS_URL } from '@wsvvrijheid/config'
import {
  StrapiModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import {  FilePicker, VideoPlayer } from '../../components'

export type ModelVideoProps<T extends FieldValues = FieldValues> = {
  model: StrapiModel
  name?: Path<T>
  isEditing: boolean
  isChangingVideo: boolean
  setIsChangingVideo: {
    on: () => void
    off: () => void
    toggle: () => void
  }
  setValue: UseFormSetValue<T>
  url?: StrapiUrl
}

export const ModelVideo = <T extends FieldValues = FieldValues>({
  setValue,
  model,
  isEditing,
  isChangingVideo,
  setIsChangingVideo,
  url,
  name,
}: ModelVideoProps<T>) => {
  // const { title, description } = (model || {}) as StrapiTranslatableModel

  const video = (model as any)?.video

  const modelVideoUrl = video?.url

  const videoUrl =
    modelVideoUrl && modelVideoUrl.startsWith('http')
      ? modelVideoUrl
      : `${ASSETS_URL}${modelVideoUrl}`

  
  const renderVideo = () => {
    if (isChangingVideo || (isEditing && !video)) {
      return (
        <Stack>
          {video && <Button onClick={setIsChangingVideo.off}>Cancel</Button>}
          <FilePicker
            onLoaded={files =>
              setValue(name as Path<T>, files[0] as PathValue<T, Path<T>>)
            }
          />
        </Stack>
      )
    } else if (!video) {
      return (
        <Stack
          borderWidth={1}
          rounded={'md'}
          h={300}
          align={'center'}
          justify={'center'}
        >
          <Box as={CiImageOff} boxSize={100} />
          <Text>No video available</Text>
        </Stack>
      )
    }

    return (
        <VideoPlayer url={videoUrl} light={model as unknown as string} />
    )
  }

  return (
    <Box
      maxH={{ base: 300, lg: 'full' }}
      rounded={'md'}
      pos={'relative'}
      overflow="hidden"
    >
      {renderVideo()}
      {isEditing && video && !isChangingVideo && (
        <Center
          pos="absolute"
          zIndex={1}
          top={0}
          left={0}
          boxSize="full"
          bg="blackAlpha.500"
          onClick={setIsChangingVideo?.toggle}
          cursor="pointer"
        >
          <Button
            leftIcon={<IoMdCloudUpload />}
            size="lg"
            colorScheme={'blackAlpha'}
          >
            Change Video
          </Button>
        </Center>
      )}
    </Box>
  )
}
