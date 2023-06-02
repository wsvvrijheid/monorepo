import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { CommentForm } from '.'
import { CommentFormProps } from './types'
import { CommentFormFieldValues } from './types'

export default {
  title: 'Forms/CommentForm',
  component: CommentForm,
} as Meta<typeof CommentForm>

type Story = StoryObj<CommentFormProps>

const StoryWithHook: StoryFn<CommentFormProps> = args => {
  const onSendForm = async (data: CommentFormFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <CommentForm {...args} onSendForm={onSendForm} />
}

export const Default: Story = {
  render: StoryWithHook,
}

export const ErrorMessage: Story = {
  render: StoryWithHook,
  args: {
    errorMessage: 'There is a error',
  },
}
