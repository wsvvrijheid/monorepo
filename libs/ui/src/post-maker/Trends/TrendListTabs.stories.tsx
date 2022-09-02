import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TrendListTabs } from './TrendListTabs'

export default {
  title: 'PostMaker/TrendListTabs',
  component: TrendListTabs,
} as ComponentMeta<typeof TrendListTabs>

const Template: ComponentStory<typeof TrendListTabs> = () => {
  return <TrendListTabs />
}

export const Default = Template.bind({})
