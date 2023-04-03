import { Meta, StoryFn } from '@storybook/react'

import { PostContainerMentionTags } from './PostContainerMentionTags'

export default {
  title: 'PostMaker/PostContainerMentionTags',
  component: PostContainerMentionTags,
} as Meta<typeof PostContainerMentionTags>

const Template: StoryFn<typeof PostContainerMentionTags> = () => {
  return <PostContainerMentionTags />
}

export const Default = Template.bind({})
