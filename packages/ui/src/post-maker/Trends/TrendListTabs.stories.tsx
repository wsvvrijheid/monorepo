import { Meta, StoryFn } from '@storybook/react'

import { TrendListTabs } from './TrendListTabs'

export default {
  title: 'PostMaker/TrendListTabs',
  component: TrendListTabs,
} as Meta<typeof TrendListTabs>

const Template: StoryFn<typeof TrendListTabs> = () => {
  return <TrendListTabs />
}

export const Default = Template.bind({})
