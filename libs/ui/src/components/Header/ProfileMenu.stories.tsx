import { Story, Meta } from '@storybook/react'

import { PROFILE } from '../../mocks'
import { ProfileMenu } from './ProfileMenu'
import { ProfileMenuProps } from './types'

export default {
  component: ProfileMenu,
  title: 'Layout/ProfileMenu',
  args: PROFILE,
} as Meta<ProfileMenuProps>

const Template: Story<ProfileMenuProps> = args => <ProfileMenu {...args} />

export const Default = Template.bind({})
Default.args = {}
