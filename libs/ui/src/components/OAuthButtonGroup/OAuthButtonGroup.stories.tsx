import { ComponentStory, ComponentMeta } from '@storybook/react'

import { OAuthButtonGroup } from './OAuthButtonGroup'

export default {
  component: OAuthButtonGroup,
  title: 'Shared/OAuthButtonGroup',
} as ComponentMeta<typeof OAuthButtonGroup>

const Template: ComponentStory<typeof OAuthButtonGroup> = args => (
  <OAuthButtonGroup {...args} />
)

export const Default = Template.bind({})
export const Disabled = Template.bind({})
Disabled.args = {
  isDisabled: true,
}
