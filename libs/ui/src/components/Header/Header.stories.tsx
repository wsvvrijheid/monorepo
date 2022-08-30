import { Story, Meta } from '@storybook/react'

import { HEADER_MENU, PROFILE } from '../../mocks'
import { Header } from './Header'
import { HeaderProps } from './types'

export default {
  component: Header,
  title: 'Layout/Header',
  args: {
    headerMenu: HEADER_MENU,
    profileMenu: PROFILE,
    logo: 'https://wsvvrijheid.nl/images/logo.svg',
  },
} as Meta<HeaderProps>

const Template: Story<HeaderProps> = args => <Header {...args} />

export const Default = Template.bind({})

export const IsLoggedIn = Template.bind({})
IsLoggedIn.args = {
  profileMenu: { ...PROFILE, isLoggedIn: true },
  isLoggedIn: true,
}
