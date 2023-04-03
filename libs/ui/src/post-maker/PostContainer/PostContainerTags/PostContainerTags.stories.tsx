import { Meta, StoryFn } from '@storybook/react'

import { PostContainerTags } from './PostContainerTags'

export default {
  title: 'PostMaker/PostContainerTags',
  component: PostContainerTags,
} as Meta<typeof PostContainerTags>

const Template: StoryFn<typeof PostContainerTags> = () => {
  return <PostContainerTags />
}

export const Default = Template.bind({})
