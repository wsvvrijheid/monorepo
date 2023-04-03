import { Meta, StoryFn } from '@storybook/react'

import { MentionListSkeleton } from './MentionListSkeleton'

export default {
  title: 'PostMaker/MentionListSkeleton',
  component: MentionListSkeleton,
} as Meta<typeof MentionListSkeleton>

const Template: StoryFn<typeof MentionListSkeleton> = () => {
  return <MentionListSkeleton />
}

export const Default = Template.bind({})
