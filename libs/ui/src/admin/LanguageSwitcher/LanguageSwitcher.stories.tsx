import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { LanguageSwitcher } from './LanguageSwitcher'

export default {
  component: LanguageSwitcher,
  title: 'Admin/LanguageSwitcher',
} as ComponentMeta<typeof LanguageSwitcher>

const Template: ComponentStory<typeof LanguageSwitcher> = args => {
  const { locale } = useRouter()
  return <LanguageSwitcher {...args} defaultLocale={locale as StrapiLocale} />
}

export const Default = Template.bind({})
Default.args = {
  onLanguageSwitch: (locale: StrapiLocale) => {
    alert('Laguage changed to ' + locale)
  },
}
