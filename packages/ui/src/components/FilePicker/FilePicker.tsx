import { ComponentProps, FC, useEffect, useId } from 'react'

import { Stack } from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  allowedFileTypes?: string[]
  maxNumberOfFiles?: number
  onLoaded: (files: File[], previews: string[]) => void
}

const uppy = new Uppy({
  meta: { type: 'avatar' },
  autoProceed: true,
}).use(Compressor, {
  id: 'Compressor',
  quality: 0.9,
  limit: 2,
})

export const FilePicker: FC<FilePickerProps> = ({
  maxNumberOfFiles,
  onLoaded,
  allowedFileTypes = ['image/*', 'video/*'],
  ...props
}) => {
  uppy.on('complete', result => {
    const files = result.successful.map(file => file.data)
    const previews = result.successful.map(file => file.preview)

    onLoaded(files as File[], previews as string[])
  })

  useEffect(() => {
    uppy.setOptions({
      restrictions: {
        maxNumberOfFiles,
        allowedFileTypes,
      },
    })
  }, [maxNumberOfFiles, allowedFileTypes])

  return (
    <Stack>
      <Dashboard
        id={useId()}
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
