import React, { useEffect } from 'react'

import { Story, Meta } from '@storybook/react'

import { Container } from '../Container'
import { FileUploader } from './FileUploader'
import { FileUploaderProps } from './types'

export default {
  title: 'Forms/FileUploader',
  component: FileUploader,
  decorators: [
    Story => (
      <Container maxW="container.md">
        <Story />
      </Container>
    ),
  ],
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
