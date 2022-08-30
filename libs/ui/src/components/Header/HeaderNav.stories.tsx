import { Story, Meta } from '@storybook/react'

import { HEADER_MENU } from '../../mocks'
import { HeaderNav } from './HeaderNav'
import { HeaderNavProps } from './types'

export default {
  component: HeaderNav,
  title: 'Layout/HeaderNav',
} as Meta<HeaderNavProps>

const Template: Story<HeaderNavProps> = args => <HeaderNav {...args} />

export const Default = Template.bind({})
Default.args = {
  menu: HEADER_MENU,
}
