import { ComponentStory, ComponentMeta } from '@storybook/react'

import { COMMENT_MOCKS } from '../../mocks/strapi'
import { CommentItem } from './CommentItem'

export default {
  component: CommentItem,
  title: 'Shared/CommentItem',
  args: {
    comment: COMMENT_MOCKS.data[0],
  },
} as ComponentMeta<typeof CommentItem>

const Template: ComponentStory<typeof CommentItem> = args => (
  <CommentItem {...args} />
)

export const Default = Template.bind({})
