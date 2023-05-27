import { StoryFn, Meta } from '@storybook/react'

import { CommentItem } from './CommentItem'

export default {
  component: CommentItem,
  title: 'Shared/CommentItem',
  args: {
    comment: {},
  },
} as Meta<typeof CommentItem>

const Template: StoryFn<typeof CommentItem> = args => <CommentItem {...args} />

export const Default = Template.bind({})
