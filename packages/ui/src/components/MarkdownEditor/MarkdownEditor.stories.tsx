import { Meta, StoryFn } from '@storybook/react'

import MarkdownEditor from './MarkdownEditor'

export default {
  component: MarkdownEditor,
  title: 'Shared/MarkdownEditor',
} as Meta<typeof MarkdownEditor>

const Template: StoryFn<typeof MarkdownEditor> = () => {
  return <MarkdownEditor />
}

export const Default = Template.bind({})
Default.args = {}
