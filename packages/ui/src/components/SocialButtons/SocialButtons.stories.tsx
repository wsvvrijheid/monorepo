import { Story, Meta } from '@storybook/react'

import { SocialButtons, SocialButtonsProps } from './SocialButtons'
import { SOCIAL_LINKS } from '../../mocks'

export default {
  component: SocialButtons,
  title: 'Shared/SocialButtons',
  args: {
    items: SOCIAL_LINKS,
  },
} as Meta<SocialButtonsProps>

const Template: Story<SocialButtonsProps> = args => <SocialButtons {...args} />

export const Default = Template.bind({})
