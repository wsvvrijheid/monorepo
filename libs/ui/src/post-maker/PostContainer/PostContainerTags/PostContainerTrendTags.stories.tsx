import { Meta, StoryFn } from '@storybook/react'

import { PostContainerTrendTags } from './PostContainerTrendTags'

export default {
  title: 'PostMaker/PostContainerTrendTags',
  component: PostContainerTrendTags,
} as Meta<typeof PostContainerTrendTags>

const Template: StoryFn<typeof PostContainerTrendTags> = () => {
  return <PostContainerTrendTags />
}

export const Default = Template.bind({})
