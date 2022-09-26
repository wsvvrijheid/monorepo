import { useEffect, useState } from 'react'

import { Story, Meta } from '@storybook/react'

import { Container } from '../Container'
import { FileUploader, FileUploaderProps } from './FileUploader'

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
  const [images, setImages] = useState<Blob[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    console.log({ images, previews })
  }, [images, previews])

  return (
    <FileUploader
      images={images}
      setImages={setImages}
      setPreviews={setPreviews}
      previews={previews}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
