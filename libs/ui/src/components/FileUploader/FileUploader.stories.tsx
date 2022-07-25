import React, { useEffect } from 'react'

import { Story, Meta } from '@storybook/react'

import { FileUploader } from './FileUploader'
import { FileUploaderProps } from './types'

export default {
  title: 'Forms/FileUploader',
  component: FileUploader,
} as Meta<typeof FileUploader>

const Template: Story<FileUploaderProps> = args => {
  const [images, setImages] = React.useState<Blob[]>([])

  useEffect(() => {
    console.log({ images })
  }, [images])

  return <FileUploader images={images} setImages={setImages} />
}

export const Default = Template.bind({})
Default.args = {}
