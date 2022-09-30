import { ComponentProps, FC, useEffect } from 'react'

import { Stack } from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import { Dashboard, useUppy } from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/url/dist/style.css'
import '@uppy/image-editor/dist/style.css'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  maxNumberOfFiles?: number
  setImages: (images: Blob[]) => void
  setPreviews?: (urls: string[]) => void
}

export const FilePicker: FC<FilePickerProps> = ({
  maxNumberOfFiles = 1,
  setImages,
  setPreviews,
  ...props
}) => {
  const uppy = useUppy(() => {
    return new Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles },
      autoProceed: true,
    })
      .use(Compressor, {
        id: 'Compressor',
        quality: 0.9,
        limit: 2,
      })
      .use(ImageEditor, {
        id: 'ImageEditor',
        quality: 0.8,
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
          croppedCanvasOptions: {},
        },
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: true,
          cropWidescreenVertical: true,
        },
      })
  })

  uppy.on('complete', result => {
    const [images, previews] = result.successful.map(file => [
      file.data,
      file.preview,
    ])
    setImages?.(images as Blob[])
    setPreviews?.(previews as string[])
  })

  useEffect(() => {
    return () => uppy.close()
  }, [uppy])

  return (
    <Stack>
      <Dashboard
        width="100%"
        height={300}
        uppy={uppy}
        plugins={['ImageEditor']}
        hideUploadButton
        showSelectedFiles
        {...props}
      />
    </Stack>
  )
}
