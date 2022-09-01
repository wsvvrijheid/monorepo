import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MENTION_MOCKS } from '@wsvvrijheid/mocks'
import { TweetUserData } from '@wsvvrijheid/types'

import { MentionListItem } from './MentionListItem'

export default {
  title: 'PostMaker/MentionListItem',
  component: MentionListItem,
} as ComponentMeta<typeof MentionListItem>

const Template: ComponentStory<typeof MentionListItem> = () => {
  return (
    <MentionListItem
      data={MENTION_MOCKS.data[0] as unknown as TweetUserData}
      onAddItem={alert}
      onRemoveItem={alert}
    />
  )
}

export const Default = Template.bind({})
