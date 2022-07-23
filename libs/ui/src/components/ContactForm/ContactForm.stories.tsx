import { Story, Meta } from '@storybook/react'

import { ContactForm } from '.'
import { ContactFormProps } from './types'
import { ContactFormFieldValues } from './types'

export default {
  title: 'Forms/ContactForm',
  component: ContactForm,
} as Meta<typeof ContactForm>

const Template: Story<ContactFormProps> = args => {
  const handleSubmitContact = async (data: ContactFormFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <ContactForm {...args} onSubmitHandler={handleSubmitContact} />
}

export const Default = Template.bind({})
Default.args = {}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  errorMessage: 'There is a error',
}
