import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SOCIAL_LINKS } from '../../mocks'
import { SocialButtons } from './SocialButtons'

export default {
  component: SocialButtons,
  title: 'Shared/SocialButtons',
  args: {
    items: SOCIAL_LINKS,
  },
} as ComponentMeta<typeof SocialButtons>

const Template: ComponentStory<typeof SocialButtons> = args => (
  <SocialButtons {...args} />
)

export const Default = Template.bind({})
