import { Meta, StoryFn } from '@storybook/react'

import { MENTION_MOCKS } from '@wsvvrijheid/mocks'

import MentionListItem from './MentionListItem'

export default {
  title: 'PostMaker/MentionListItem',
  component: MentionListItem,
} as Meta<typeof MentionListItem>

const Template: StoryFn<typeof MentionListItem> = () => {
  return (
    <MentionListItem
      data={MENTION_MOCKS.data[0] as any}
      onAddItem={alert}
      onRemoveItem={alert}
    />
  )
}

export const Default = Template.bind({})
