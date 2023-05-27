import { Meta, StoryFn } from '@storybook/react'

import { LanguageSwitcher } from './LanguageSwitcher'

export default {
  component: LanguageSwitcher,
  title: 'Admin/LanguageSwitcher',
} as Meta<typeof LanguageSwitcher>

const Template: StoryFn<typeof LanguageSwitcher> = args => {
  return <LanguageSwitcher />
}

export const Default = Template.bind({})
