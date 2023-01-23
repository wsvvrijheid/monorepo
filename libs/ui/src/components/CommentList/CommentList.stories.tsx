import { ComponentStory, ComponentMeta } from '@storybook/react'
import { COMMENT_MOCKS } from '@wsvvrijheid/mocks'

import { CommentList } from './CommentList'
import { Container } from '../Container'

export default {
  component: CommentList,
  title: 'Shared/CommentList',
  args: {
    comments: COMMENT_MOCKS.data,
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = args => (
  <CommentList {...args} />
)

export const Default = Template.bind({})
