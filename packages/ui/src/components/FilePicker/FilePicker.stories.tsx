import { Meta, StoryObj } from '@storybook/react'

import { FilePicker, FilePickerProps } from './FilePicker'

export default {
  component: FilePicker,
  title: 'Shared/FilePicker',
  argTypes: {
    setFiles: { action: 'setFiles' },
  },
} as Meta<FilePickerProps>

type Story = StoryObj<FilePickerProps>

export const Default: Story = {}
