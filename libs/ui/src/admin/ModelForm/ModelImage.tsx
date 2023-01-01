import { FC } from 'react'

import { Box, Button, Center, Stack } from '@chakra-ui/react'
import { UploadFile, StrapiTranslatableModel } from '@wsvvrijheid/types'
import { UseFormSetValue } from 'react-hook-form'
import { IoMdCloudUpload } from 'react-icons/io'
import { AssertsShape } from 'yup/lib/object'

import { FilePicker, WImage } from '../../components'

type ModelImageProps = {
  model: StrapiTranslatableModel
  isEditing: boolean
  isChangingImage: boolean
  setIsChangingImage: {
    on: () => void
    off: () => void
    toggle: () => void
  }
  setValue: UseFormSetValue<AssertsShape<any>>
}

export const ModelImage: FC<ModelImageProps> = ({
  setValue,
  model,
  isEditing,
  isChangingImage,
  setIsChangingImage,
}) => {
  return (
    <Box maxH={{ base: 300, lg: 'full' }} rounded={'md'} overflow="hidden">
      {isChangingImage ? (
        <Stack>
          <Button onClick={setIsChangingImage.off}>Cancel</Button>
          <FilePicker setFiles={files => setValue('image', files[0])} />
        </Stack>
      ) : (
        <Box pos="relative" role="group" h="full">
          <WImage
            src={model.image as UploadFile}
            alt={model.title}
            hasZoom
            objectFit="contain"
          />

          {isEditing && (
            <Center
              pos="absolute"
              top={0}
              left={0}
              boxSize="full"
              bg="blackAlpha.500"
              onClick={setIsChangingImage.toggle}
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
