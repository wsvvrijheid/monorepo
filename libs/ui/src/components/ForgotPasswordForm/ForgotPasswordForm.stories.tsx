import { Story, Meta } from '@storybook/react'

import { ForgotPasswordForm } from './ForgotPasswordForm'
import { ForgotPasswordFormProps, ForgotPasswordFieldValues } from './types'

export default {
  title: 'Forms/ForgotPasswordForm',
  component: ForgotPasswordForm,
} as Meta<ForgotPasswordFormProps>

const Template: Story<ForgotPasswordFormProps> = args => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const onSubmit = (data: ForgotPasswordFieldValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    alert(JSON.stringify(data))
  }
  return <ForgotPasswordForm onSubmitHandler={onSubmit} isLoading={isLoading} />
}

export const Default = Template.bind({})
Default.args = {}
