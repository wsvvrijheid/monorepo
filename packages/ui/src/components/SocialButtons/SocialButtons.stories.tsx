import { StoryObj, Meta } from '@storybook/react'

import { SocialButtons, SocialButtonsProps } from './SocialButtons'
import { SOCIAL_LINKS } from '../../mocks'

export default {
  component: SocialButtons,
  title: 'Shared/SocialButtons',
  args: {
    items: SOCIAL_LINKS,
  },
} as Meta<SocialButtonsProps>

type Story = StoryObj<SocialButtonsProps>

export const Default: Story = {}
