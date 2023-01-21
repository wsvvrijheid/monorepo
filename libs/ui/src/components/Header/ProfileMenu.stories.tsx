import { Story, Meta } from '@storybook/react'

import { ProfileMenu } from './ProfileMenu'
import { ProfileMenuProps } from './types'
import { PROFILE } from '../../mocks'

export default {
  component: ProfileMenu,
  title: 'Layout/ProfileMenu',
  args: PROFILE,
} as Meta<ProfileMenuProps>

const Template: Story<ProfileMenuProps> = args => <ProfileMenu {...args} />

export const Default = Template.bind({})
Default.args = {}
