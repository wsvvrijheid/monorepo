import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MentionListSkeleton } from './MentionListSkeleton'

export default {
  title: 'PostMaker/MentionListSkeleton',
  component: MentionListSkeleton,
} as ComponentMeta<typeof MentionListSkeleton>

const Template: ComponentStory<typeof MentionListSkeleton> = () => {
  return <MentionListSkeleton />
}

export const Default = Template.bind({})
