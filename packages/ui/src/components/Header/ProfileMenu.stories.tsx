import { StoryObj, Meta } from '@storybook/react'

import { ProfileMenu } from './ProfileMenu'
import { ProfileMenuProps } from './types'
import { PROFILE } from '../../mocks'

export default {
  component: ProfileMenu,
  title: 'Layout/ProfileMenu',
  args: PROFILE,
} as Meta<ProfileMenuProps>

type Story = StoryObj<ProfileMenuProps>

export const Default: Story = {}
