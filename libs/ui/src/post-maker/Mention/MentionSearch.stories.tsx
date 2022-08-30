import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MentionSearch } from './MentionSearch'

export default {
  title: 'PostMaker/MentionSearch',
  component: MentionSearch,
} as ComponentMeta<typeof MentionSearch>

const Template: ComponentStory<typeof MentionSearch> = () => {
  return <MentionSearch />
}

export const Default = Template.bind({})
