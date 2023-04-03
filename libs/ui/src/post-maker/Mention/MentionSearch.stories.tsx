import { Meta, StoryFn } from '@storybook/react'

import { MentionSearch } from './MentionSearch'

export default {
  title: 'PostMaker/MentionSearch',
  component: MentionSearch,
} as Meta<typeof MentionSearch>

const Template: StoryFn<typeof MentionSearch> = () => {
  return <MentionSearch />
}

export const Default = Template.bind({})
