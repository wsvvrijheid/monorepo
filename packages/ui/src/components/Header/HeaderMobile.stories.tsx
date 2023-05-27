import { Story, Meta } from '@storybook/react'

import { HeaderMobile } from './HeaderMobile'
import { HeaderMobileProps } from './types'
import { HEADER_MENU, PROFILE } from '../../mocks'

export default {
  component: HeaderMobile,
  title: 'Layout/HeaderMobile',
} as Meta<HeaderMobileProps>

const Template: Story<HeaderMobileProps> = args => <HeaderMobile {...args} />

export const Default = Template.bind({})
Default.args = {
  headerMenu: HEADER_MENU,
  profileMenu: PROFILE,
}

export const IsLoggedIn = Template.bind({})
IsLoggedIn.args = {
  isLoggedIn: true,
  headerMenu: HEADER_MENU,
  profileMenu: { ...PROFILE },
}
