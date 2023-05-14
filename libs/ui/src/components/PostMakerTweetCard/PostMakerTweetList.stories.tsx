import { Meta, StoryObj } from '@storybook/react'

import { postMock } from './mock'
import {
  PostMakerTweetList,
  PostMakerTweetListProps,
} from './PostMakerTweetList'
export default {
  title: 'Admin/PostMakerTweetList',
  component: PostMakerTweetList,
} as Meta<PostMakerTweetListProps>

type Story = StoryObj<PostMakerTweetListProps>

export const Default: Story = {
  args: {
    posts: [postMock, postMock, postMock],
  },
}
