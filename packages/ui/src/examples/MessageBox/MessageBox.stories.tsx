import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { MessageBox } from './MessageBox'
import { MessageBoxFieldValues, MessageBoxProps } from './types'

export default {
  component: MessageBox,
  title: 'Example/MessageBox',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof MessageBox>

const Template: Story<MessageBoxProps> = args => {
  const handleSubmitContact = async (data: MessageBoxFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <MessageBox {...args} onSubmitHandler={handleSubmitContact} />
}

export const Default = Template.bind({})
Default.args = {
  isError: false,
  isSuccess: false,
  isLoading: false,
}

export const Success = Template.bind({})
Success.args = {
  errorMessage: 'There is an error',
  isError: false,
  isSuccess: true,
  isLoading: false,
}

export const Error = Template.bind({})
Error.args = {
  errorMessage: 'There is an error',
  isError: true,
  isSuccess: false,
  isLoading: false,
}

export const Loading = Template.bind({})
Loading.args = {
  errorMessage: 'There is an error',
  isError: false,
  isSuccess: false,
  isLoading: true,
}
