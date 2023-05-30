import { Meta, Story } from '@storybook/react'

import { FilePicker, FilePickerProps } from './FilePicker'

export default {
  component: FilePicker,
  title: 'Shared/FilePicker',
} as Meta<FilePickerProps>

const Template: Story<FilePickerProps> = args => (
  <FilePicker
    {...args}
    onLoaded={(files, previews) => console.log(files, previews)}
  />
)

export const Default = Template.bind({})
Default.args = {}
