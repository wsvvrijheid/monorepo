import { StoryObj, Meta } from '@storybook/react'

import { HeaderMobileNav } from './HeaderMobileNav'
import { HeaderMobileNavProps } from './types'
import { HEADER_MENU } from '../../mocks'

export default {
  component: HeaderMobileNav,
  title: 'Layout/HeaderMobileNav',
} as Meta<HeaderMobileNavProps>

type Story = StoryObj<HeaderMobileNavProps>

export const Default: Story = {
  args: {
    headerMenu: HEADER_MENU,
  },
}
