import { Meta, Story } from '@storybook/react'

import { FilePicker, FilePickerProps } from './FilePicker'

export default {
  component: FilePicker,
  title: 'Shared/FilePicker',
} as Meta<FilePickerProps>

const Template: Story<FilePickerProps> = args => (
  <FilePicker {...args} setFiles={x => console.log(x)} />
)

export const Default = Template.bind({})
Default.args = {}
