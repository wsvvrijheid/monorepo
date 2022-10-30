import { Story, Meta } from '@storybook/react'

import { SignupForm } from '.'
import { SignupFormProps, SignupFormFieldValues } from './types'

export default {
  title: 'Forms/SignupForm',
  component: SignupForm,
} as Meta<typeof SignupForm>

const Template: Story<SignupFormProps> = args => {
  const handleSubmitSignUp = async (data: SignupFormFieldValues) => {
    alert(JSON.stringify(data))
  }
  const handleTermsAccepted = () => {
    alert(JSON.stringify('setIsTermsAccepted(false)'))
  }

  return (
    <SignupForm
      {...args}
      onSignup={handleSubmitSignUp}
      onAcceptTerms={handleTermsAccepted}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  errorMessage: 'There is a error',
}
