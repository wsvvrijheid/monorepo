import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PostContainerMentionTags } from './PostContainerMentionTags'

export default {
  title: 'PostMaker/PostContainerMentionTags',
  component: PostContainerMentionTags,
} as ComponentMeta<typeof PostContainerMentionTags>

const Template: ComponentStory<typeof PostContainerMentionTags> = () => {
  return <PostContainerMentionTags />
}

export const Default = Template.bind({})
