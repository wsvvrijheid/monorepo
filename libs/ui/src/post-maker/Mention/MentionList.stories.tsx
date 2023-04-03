import { Meta, StoryFn } from '@storybook/react'

import { MentionList } from './MentionList'

export default {
  title: 'PostMaker/MentionList',
  component: MentionList,
} as Meta<typeof MentionList>

const Template: StoryFn<typeof MentionList> = () => {
  return <MentionList />
}

export const Default = Template.bind({})
