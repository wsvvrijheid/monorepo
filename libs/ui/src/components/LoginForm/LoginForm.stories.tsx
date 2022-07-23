import { Story, Meta } from '@storybook/react'

import { LoginForm } from '.'
import { LoginFormProps } from './types'
import { LoginFormFieldValues } from './types'

export default {
  title: 'Forms/LoginForm',
  component: LoginForm,
} as Meta<typeof LoginForm>

const Template: Story<LoginFormProps> = args => {
  const handleSubmitSign = async (data: LoginFormFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <LoginForm {...args} onSubmitHandler={handleSubmitSign} />
}

export const Default = Template.bind({})
Default.args = {}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  errorMessage: 'There is a error',
}
