import { Story, Meta } from '@storybook/react'

import { SignupForm } from '.'
import { SignupFormProps } from './types'

export default {
  title: 'Forms/SignupForm',
  component: SignupForm,
} as Meta<typeof SignupForm>

const Template: Story<SignupFormProps> = args => {
  return <SignupForm {...args} />
}

export const Default = Template.bind({})
Default.args = {}
