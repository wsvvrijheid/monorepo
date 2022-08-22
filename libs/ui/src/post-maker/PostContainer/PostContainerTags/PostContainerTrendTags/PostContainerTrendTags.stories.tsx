import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PostContainerTrendTags } from './PostContainerTrendTags'

export default {
  title: 'PostMaker/PostContainerTrendTags',
  component: PostContainerTrendTags,
} as ComponentMeta<typeof PostContainerTrendTags>

const Template: ComponentStory<typeof PostContainerTrendTags> = () => {
  return <PostContainerTrendTags />
}

export const Default = Template.bind({})
