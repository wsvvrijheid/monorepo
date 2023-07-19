import { Box, Button, Center, Stack, Text } from '@chakra-ui/react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { CiImageOff } from 'react-icons/ci'
import { IoMdCloudUpload } from 'react-icons/io'

import { ASSETS_URL } from '@wsvvrijheid/config'
import {
  Post,
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'

import { Caps, FilePicker, VideoPlayer, WImage } from '../../components'

export type ModelMediaProps<T extends FieldValues = FieldValues> = {
  model: StrapiModel
  name?: Path<T>
  isEditing: boolean
  isChangingMedia: boolean
  toggleChangingMedia: () => void
  setValue: UseFormSetValue<T>
  url?: StrapiUrl
}

export const ModelMedia = <T extends FieldValues = FieldValues>({
  setValue,
  model,
  isEditing,
  isChangingMedia: isChangingImage,
  toggleChangingMedia: toggleChangingImage,
  url,
  name,
}: ModelMediaProps<T>) => {
  const { title, description } = (model || {}) as StrapiTranslatableModel

  // Name can be image or avatar
  const media = (model as any)?.[(name as string) || 'image']

  const modelMediaUrl = media?.url

  const mediaUrl =
    modelMediaUrl && modelMediaUrl.startsWith('http')
      ? modelMediaUrl
      : `${ASSETS_URL}${modelMediaUrl}`

  const renderMedia = () => {
    if (isChangingImage || (isEditing && !media)) {
      return (
        <Stack>
          {media && <Button onClick={toggleChangingImage}>Cancel</Button>}
          <FilePicker
            onLoaded={files =>
              setValue(name as Path<T>, files[0] as PathValue<T, Path<T>>)
            }
          />
        </Stack>
      )
    }

    if (!media) {
      return (
        <Stack
          borderWidth={1}
          rounded={'md'}
          h={300}
          align={'center'}
          justify={'center'}
        >
          <Box as={CiImageOff} boxSize={100} />
          <Text>No media available</Text>
        </Stack>
      )
    }

    if (name === 'video') {
      return <VideoPlayer url={mediaUrl} light={model as unknown as string} />
    }

    if (url === 'api/posts' && mediaUrl && name === 'image') {
      return (
        <Caps
          imageParams={{
            title,
            text: description as string,
            image: mediaUrl,
            ...(model as Post)?.imageParams,
          }}
        />
      )
    }

    return (
      <WImage
        src={mediaUrl}
        alt={title}
        hasZoom
        objectFit="contain"
        sizes="(max-width: 480) 80vw, 33vw"
      />
    )
  }

  return (
    <Box
      maxH={{ base: 300, lg: 'full' }}
      rounded={'md'}
      pos={'relative'}
      overflow="hidden"
    >
      {renderMedia()}
      {isEditing && media && !isChangingImage && (
        <Center
          pos="absolute"
          zIndex={1}
          top={0}
          left={0}
          boxSize="full"
          bg="blackAlpha.500"
          onClick={toggleChangingImage}
          cursor="pointer"
        >
          <Button
            leftIcon={<IoMdCloudUpload />}
            size="lg"
            colorScheme={'blackAlpha'}
          >
            Change Image
          </Button>
        </Center>
      )}
    </Box>
  )
}
