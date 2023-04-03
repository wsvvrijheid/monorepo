import { Meta, StoryFn } from '@storybook/react'

import { PostTextarea } from './PostTextarea'

export default {
  title: 'PostMaker/PostTextarea',
  component: PostTextarea,
} as Meta<typeof PostTextarea>

const Template: StoryFn<typeof PostTextarea> = args => {
  return <PostTextarea isEditable />
}

export const Default = Template.bind({})
