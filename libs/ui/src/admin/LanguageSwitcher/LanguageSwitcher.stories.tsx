import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LanguageSwitcher } from './LanguageSwitcher'

export default {
  component: LanguageSwitcher,
  title: 'Admin/LanguageSwitcher',
} as ComponentMeta<typeof LanguageSwitcher>

const Template: ComponentStory<typeof LanguageSwitcher> = args => {
  return <LanguageSwitcher />
}

export const Default = Template.bind({})
