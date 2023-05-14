import { Meta, StoryObj } from '@storybook/react'

import { postMock } from './mock'
import { PostMakerTweetCard } from './PostMakerTweetCard'

export default {
  title: 'Admin/PostMakerTweetCard',
  component: PostMakerTweetCard,
} as Meta<typeof PostMakerTweetCard>

type Story = StoryObj<typeof PostMakerTweetCard>

export const Default: Story = {
  args: {
    post: postMock,
  },
}
