import { StoryFn, Meta } from '@storybook/react'

import { SocialLoginButtons } from './SocialLoginButtons'

export default {
  component: SocialLoginButtons,
  title: 'Shared/SocialLoginButtons',
} as Meta<typeof SocialLoginButtons>

const Template: StoryFn<typeof SocialLoginButtons> = args => (
  <SocialLoginButtons {...args} />
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
Disabled.args = {
  providersToBeShown: ['twitter'],
}
