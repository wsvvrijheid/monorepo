import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SocialLoginButtons } from './SocialLoginButtons'

export default {
  component: SocialLoginButtons,
  title: 'Shared/SocialLoginButtons',
} as ComponentMeta<typeof SocialLoginButtons>

const Template: ComponentStory<typeof SocialLoginButtons> = args => (
  <SocialLoginButtons {...args} />
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
Disabled.args = {
  providersToBeShown: ['twitter'],
}
