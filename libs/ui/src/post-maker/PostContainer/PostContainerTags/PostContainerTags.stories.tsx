import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PostContainerTags } from './PostContainerTags'

export default {
  title: 'PostMaker/PostContainerTags',
  component: PostContainerTags,
} as ComponentMeta<typeof PostContainerTags>

const Template: ComponentStory<typeof PostContainerTags> = () => {
  return <PostContainerTags />
}

export const Default = Template.bind({})
