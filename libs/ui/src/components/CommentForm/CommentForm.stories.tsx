import { Story, Meta } from '@storybook/react'

import { CommentForm } from '.'
import { CommentFormProps } from './types'
import { CommentFormFieldValues } from './types'

export default {
  title: 'Forms/CommentForm',
  component: CommentForm,
} as Meta<typeof CommentForm>

const Template: Story<CommentFormProps> = args => {
  const onSendForm = async (data: CommentFormFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <CommentForm {...args} onSendForm={onSendForm} />
}

export const Default = Template.bind({})
Default.args = {}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  errorMessage: 'There is a error',
}
