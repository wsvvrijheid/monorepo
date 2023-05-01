import { StoryObj, Meta } from '@storybook/react'

import { Header } from './Header'
import { HeaderProps } from './types'
import { HEADER_MENU, PROFILE } from '../../mocks'

export default {
  component: Header,
  title: 'Layout/Header',
  args: {
    headerMenu: HEADER_MENU,
    profileMenu: PROFILE,
    logo: 'https://wsvvrijheid.nl/images/logo.svg',
  },
} as Meta<HeaderProps>

type Story = StoryObj<HeaderProps>

export const Default: Story = {}

export const IsLoggedIn: Story = {
  args: {
    profileMenu: { ...PROFILE },
    isLoggedIn: true,
  },
}
