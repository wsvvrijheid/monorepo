import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CommentItem } from './CommentItem'

export default {
  component: CommentItem,
  title: 'Shared/CommentItem',
  args: {
    comment: {},
  },
} as ComponentMeta<typeof CommentItem>

const Template: ComponentStory<typeof CommentItem> = args => (
  <CommentItem {...args} />
)

export const Default = Template.bind({})
