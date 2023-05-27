import { Story, Meta } from '@storybook/react'

import { HeaderMobileNav } from './HeaderMobileNav'
import { HeaderMobileNavProps } from './types'
import { HEADER_MENU } from '../../mocks'

export default {
  component: HeaderMobileNav,
  title: 'Layout/HeaderMobileNav',
} as Meta<HeaderMobileNavProps>

const Template: Story<HeaderMobileNavProps> = args => (
  <HeaderMobileNav {...args} />
)

export const Default = Template.bind({})
Default.args = {
  headerMenu: HEADER_MENU,
}
