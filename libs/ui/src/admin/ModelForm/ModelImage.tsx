import { FC } from 'react'

import { Box, Button, Center, Stack } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { UseFormSetValue } from 'react-hook-form'
import { IoMdCloudUpload } from 'react-icons/io'
import { AssertsShape } from 'yup/lib/object'

import { FilePicker, OgImage, WImage } from '../../components'

export type ModelImageProps = {
  model: StrapiModel
  isEditing: boolean
  isChangingImage: boolean
  setIsChangingImage: {
    on: () => void
    off: () => void
    toggle: () => void
  }
  setValue: UseFormSetValue<AssertsShape<any>>
  url?: StrapiUrl
}

export const ModelImage: FC<ModelImageProps> = ({
  setValue,
  model,
  isEditing,
  isChangingImage,
  setIsChangingImage,
  url,
}) => {
  const modelWithImage = model as StrapiTranslatableModel

  const modelImageUrl = modelWithImage?.image?.url

  const imageUrl = modelImageUrl?.startsWith('http')
    ? modelImageUrl
    : `${API_URL}${modelImageUrl}`

  return (
    <Box maxH={{ base: 300, lg: 'full' }} rounded={'md'} overflow="hidden">
      {isChangingImage ? (
        <Stack>
          {model && <Button onClick={setIsChangingImage.off}>Cancel</Button>}
          <FilePicker setFiles={files => setValue('image', files[0])} />
        </Stack>
      ) : (
        <Box pos="relative" role="group" h="full">
          {url === 'api/posts' ? (
            <OgImage
              title={modelWithImage.title}
              text={modelWithImage.description as string}
              image={imageUrl}
            />
          ) : (
            <WImage
              src={modelWithImage?.image?.url as string}
              alt={modelWithImage?.title}
              hasZoom
              objectFit="contain"
            />
          )}

          {isEditing && (
            <Center
              pos="absolute"
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
      )}
    </Box>
  )
}
