/* eslint-disable @typescript-eslint/ban-types */

import { ComponentMeta, ComponentStory } from '@storybook/react'

import MarkdownEditor from './MarkdownEditor'

export default {
  component: MarkdownEditor,
  title: 'Shared/MarkdownEditor',
} as ComponentMeta<typeof MarkdownEditor>

const Template: ComponentStory<typeof MarkdownEditor> = () => {
  return <MarkdownEditor />
}

export const Default = Template.bind({})
Default.args = {}
