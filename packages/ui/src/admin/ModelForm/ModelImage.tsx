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
  UploadFile,
} from '@wsvvrijheid/types'

import { Caps, FilePicker, WImage } from '../../components'

export type ModelImageProps<T extends FieldValues = FieldValues> = {
  model: StrapiModel
  name?: Path<T>
  isEditing: boolean
  isChangingImage: boolean
  setIsChangingImage: {
    on: () => void
    off: () => void
    toggle: () => void
  }
  setValue: UseFormSetValue<T>
  url?: StrapiUrl
}

export const ModelImage = <T extends FieldValues = FieldValues>({
  setValue,
  model,
  isEditing,
  isChangingImage,
  setIsChangingImage,
  url,
  name,
}: ModelImageProps<T>) => {
  const { title, description } = (model || {}) as StrapiTranslatableModel

  // Name can be image or avatar
  const image = (model as any)[name as string]

  const modelImageUrl = image?.url

  const imageUrl =
    modelImageUrl && modelImageUrl.startsWith('http')
      ? modelImageUrl
      : `${ASSETS_URL}${modelImageUrl}`

  const renderImage = () => {
    if (isChangingImage || (isEditing && !image)) {
      return (
        <Stack>
          {image && <Button onClick={setIsChangingImage.off}>Cancel</Button>}
          <FilePicker
            onLoaded={files =>
              setValue(name as Path<T>, files[0] as PathValue<T, Path<T>>)
            }
          />
        </Stack>
      )
    } else if (!image) {
      return (
        <Stack
          borderWidth={1}
          rounded={'md'}
          h={300}
          align={'center'}
          justify={'center'}
        >
          <Box as={CiImageOff} boxSize={100} />
          <Text>No image available</Text>
        </Stack>
      )
    }

    if (url === 'api/posts' && imageUrl) {
      return (
        <Caps
          imageParams={{
            title,
            text: description as string,
            image: imageUrl,
            ...(model as Post)?.imageParams,
          }}
        />
      )
    }

    return (
      <WImage
        src={image as UploadFile}
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
      {renderImage()}
      {isEditing && image && !isChangingImage && (
        <Center
          pos="absolute"
          zIndex={1}
          top={0}
          left={0}
          boxSize="full"
          bg="blackAlpha.500"
          onClick={setIsChangingImage?.toggle}
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
