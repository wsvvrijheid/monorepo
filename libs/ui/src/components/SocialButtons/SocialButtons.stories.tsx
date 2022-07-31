import { Story, Meta } from '@storybook/react'

import { SOCIAL_LINKS } from '../../mocks'
import { SocialButtons, SocialButtonsProps } from './SocialButtons'

export default {
  component: SocialButtons,
  title: 'Shared/SocialButtons',
  args: {
    items: SOCIAL_LINKS,
  },
} as Meta<SocialButtonsProps>

const Template: Story<SocialButtonsProps> = args => <SocialButtons {...args} />

export const Default = Template.bind({})
