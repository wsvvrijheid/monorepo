import { Meta, StoryObj } from '@storybook/react'

import { FilePicker, FilePickerProps } from './FilePicker'

export default {
  component: FilePicker,
  title: 'Shared/FilePicker',
} as Meta<FilePickerProps>

type Story = StoryObj<FilePickerProps>

export const Default: Story = {
  args: {
    setFiles: x => console.log(x),
  },
}
