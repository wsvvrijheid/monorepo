import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PostTextarea } from './PostTextarea'

export default {
  title: 'PostMaker/PostTextarea',
  component: PostTextarea,
} as ComponentMeta<typeof PostTextarea>

const Template: ComponentStory<typeof PostTextarea> = args => {
  return <PostTextarea isEditable />
}

export const Default = Template.bind({})
