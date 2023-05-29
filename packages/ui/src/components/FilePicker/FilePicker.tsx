import { ComponentProps, FC, useEffect, useMemo } from 'react'

import { Stack } from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import { Dashboard, useUppy } from '@uppy/react'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  allowedFileTypes?: string[]
  maxNumberOfFiles?: number
  setFiles: (files: File[]) => void
  setPreviews?: (urls: string[]) => void
}

export const FilePicker: FC<FilePickerProps> = ({
  maxNumberOfFiles,
  setFiles,
  setPreviews,
  allowedFileTypes = ['image/*', 'video/*'],
  ...props
}) => {
  const uppy = useMemo(() => {
    return new Uppy({
      meta: { type: 'avatar' },
      restrictions: { maxNumberOfFiles, allowedFileTypes },
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
  }, [maxNumberOfFiles, allowedFileTypes])

  uppy.on('complete', result => {
    const files = result.successful.map(file => file.data)
    const previews = result.successful.map(file => file.preview)

    setFiles(files as File[])
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
