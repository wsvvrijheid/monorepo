import { StoryObj, Meta } from '@storybook/react'

import { HeaderMobile } from './HeaderMobile'
import { HeaderMobileProps } from './types'
import { HEADER_MENU, PROFILE } from '../../mocks'

export default {
  component: HeaderMobile,
  title: 'Layout/HeaderMobile',
} as Meta<HeaderMobileProps>

type Story = StoryObj<HeaderMobileProps>

export const Default: Story = {
  args: {
    headerMenu: HEADER_MENU,
    profileMenu: PROFILE,
  },
}

export const IsLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    headerMenu: HEADER_MENU,
    profileMenu: { ...PROFILE },
  },
}
