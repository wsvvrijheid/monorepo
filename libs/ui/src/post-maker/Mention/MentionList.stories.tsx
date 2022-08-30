import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MentionList } from './MentionList'

export default {
  title: 'PostMaker/MentionList',
  component: MentionList,
} as ComponentMeta<typeof MentionList>

const Template: ComponentStory<typeof MentionList> = () => {
  return <MentionList />
}

export const Default = Template.bind({})
