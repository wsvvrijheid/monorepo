import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useRef,
} from 'react'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { resizeImage } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { GrClearOption } from 'react-icons/gr'

export type FileUploaderProps = {
  setImages: Dispatch<SetStateAction<Blob[]>>
  setPreviews: Dispatch<SetStateAction<string[]>>
  maxSize?: number
  images: Array<Blob>
  previews: Array<string>
  singleFile?: boolean
}

export const FileUploader: FC<FileUploaderProps> = ({
  images = [],
  previews = [],
  setImages,
  setPreviews,
  maxSize,
  singleFile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const filesArr = event.target.files
    if (!filesArr) return
    const files = Array.from(filesArr)
    const compressedFiles = await Promise.all(
      files.map(file => resizeImage(file, maxSize)),
    )
    compressedFiles.forEach(file => {
      setImages(prev => [...prev, file])
      setPreviews(prev => [...prev, URL.createObjectURL(file)])
    })
  }

  const sizes = images?.reduce((acc, curr) => acc + curr.size, 0) || 0

  const onDrop = (event: DragEvent) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault()

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          if (singleFile === true && event.dataTransfer.items.length > 1) return
          const file = event.dataTransfer.items[i].getAsFile()
          setImages(prev => [...prev, file as Blob])
          setPreviews(prev => [...prev, URL.createObjectURL(file as Blob)])
        }
      }
    } else {
      if (singleFile === true && event.dataTransfer.files.length > 1) return
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i]
        setImages(prev => [
          ...prev,
          { ...file, preview: URL.createObjectURL(file) },
        ])
      }
    }
  }
  const isSingleFileValid = !(singleFile && images.length === 1)

  return (
    <Stack>
      <FormControl>
        <FormLabel htmlFor="form-input" mb={2} fontWeight={'600'}>
          {t`upload.label`}
        </FormLabel>
        <Input
          id="form-input"
          accept="image/png, image/jpeg, image/jpeg, image/webp"
          type={'file'}
          multiple={!singleFile}
          display={'none'}
          ref={inputRef}
          onChange={onInputChange}
        />
        <VStack
          h={250}
          bg="gray.100"
          textAlign={'center'}
          justify="center"
          fontSize="sm"
          borderRadius="md"
          border={'1px dashed gray'}
          onClick={() => isSingleFileValid && inputRef?.current?.click()}
          cursor={isSingleFileValid ? 'pointer' : undefined}
          onDrop={(e: DragEvent) => onDrop(e)}
          onDragOver={(e: DragEvent) => e.preventDefault()}
        >
          {previews?.length > 0 ? (
            <SimpleGrid w="full" columns={2} overflowY="auto" p={2} gap={2}>
              {previews.map((preview, i) => (
                <Image
                  boxSize="full"
                  objectFit="contain"
                  key={i}
                  src={preview}
                  // alt={preview.name}
                />
              ))}
            </SimpleGrid>
          ) : (
            <>
              <Box as={AiOutlineCloudUpload} boxSize={50} />
              <Text>{t`upload.description`}</Text>
              <Text>{t`upload.support`}</Text>
            </>
          )}
        </VStack>
      </FormControl>
      <HStack w="full" justify="space-between">
        {images?.length > 0 && (
          <Text>
            {images?.length} images, {(sizes / 1000000).toFixed(2)}MB
          </Text>
        )}
        <Button
          leftIcon={<GrClearOption />}
          ml="auto"
          onClick={() => {
            setImages([])
            setPreviews([])
          }}
        >
          {t`clear`}
        </Button>
      </HStack>
    </Stack>
  )
}
