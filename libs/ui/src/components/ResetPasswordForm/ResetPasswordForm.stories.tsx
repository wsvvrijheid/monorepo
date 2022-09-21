import { Story, Meta } from '@storybook/react'

import { ResetPasswordForm } from './ResetPasswordForm'
import { ResetPasswordFieldValues, ResetPasswordFormProps } from './types'

export default {
  title: 'Forms/ResetPasswordForm',
  component: ResetPasswordForm,
} as Meta<ResetPasswordFormProps>

const Template: Story<ResetPasswordFormProps> = args => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const onSubmit = (data: ResetPasswordFieldValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    alert(JSON.stringify(data))
  }
  return <ResetPasswordForm onSubmitHandler={onSubmit} isLoading={isLoading} />
}

export const Default = Template.bind({})
Default.args = {}
