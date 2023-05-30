import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { ContactForm } from '.'
import { ContactFormProps } from './types'
import { ContactFormFieldValues } from './types'

export default {
  title: 'Forms/ContactForm',
  component: ContactForm,
} as Meta<typeof ContactForm>

type Story = StoryObj<ContactFormProps>

const StoryWithHook: StoryFn<ContactFormProps> = args => {
  const handleSubmitContact = async (data: ContactFormFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <ContactForm {...args} onSubmitHandler={handleSubmitContact} />
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
