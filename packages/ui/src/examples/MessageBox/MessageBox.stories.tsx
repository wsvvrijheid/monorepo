import { Container } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { MessageBox } from './MessageBox'
import { MessageBoxFieldValues, MessageBoxProps } from './types'

export default {
  component: MessageBox,
  title: 'Example/MessageBox',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof MessageBox>

type Story = StoryObj<MessageBoxProps>

const StoryWithHook: StoryFn<MessageBoxProps> = args => {
  const handleSubmitContact = async (data: MessageBoxFieldValues) => {
    alert(JSON.stringify(data))
  }

  return <MessageBox {...args} onSubmitHandler={handleSubmitContact} />
}

export const Default: Story = {
  render: StoryWithHook,
  args: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
}

export const Success: Story = {
  render: StoryWithHook,
  args: {
    errorMessage: 'There is an error',
    isError: false,
    isSuccess: true,
    isLoading: false,
  },
}

export const Error: Story = {
  render: StoryWithHook,
  args: {
    errorMessage: 'There is an error',
    isError: true,
    isSuccess: false,
    isLoading: false,
  },
}

export const Loading: Story = {
  render: StoryWithHook,
  args: {
    errorMessage: 'There is an error',
    isError: false,
    isSuccess: false,
    isLoading: true,
  },
}
