import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useMutation } from '@tanstack/react-query'

import {
  ChakraBreakpointExample,
  ChakraBreakpointExampleProps,
} from './ChakraBreakpointExample'

export default {
  component: ChakraBreakpointExample,
  title: 'Example/ChakraBreakpointReactQueryExample',
} as Meta<ChakraBreakpointExampleProps> // or Meta<typeof ChakraBreakpointExample>

type Story = StoryObj<ChakraBreakpointExampleProps> // or StoryObj<typeof ChakraBreakpointExample>

// Ref: https://javascript.info/task/delay-promise
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const sendMessage = async (message: string) => {
  const random = Math.random()

  await delay(1000) // simulate network delay

  if (random > 0.5) {
    return Promise.reject('Error')
  }

  console.log('Message', message)

  return 'Success'
}

const StoryWithHook: StoryFn<ChakraBreakpointExampleProps> = args => {
  const { mutate, isSuccess, isError, isLoading } = useMutation({
    mutationKey: ['send-message'],
    mutationFn: ({ message }: { message: string }) => sendMessage(message),
  })

  return (
    <ChakraBreakpointExample
      onSend={message => mutate({ message })} // Simulate a network request
      isError={args.isError || isError} // Override isError prop if provided in Storybook args
      isLoading={args.isLoading || isLoading} // Override isLoading prop if provided in Storybook args
      isSuccess={args.isSuccess || isSuccess} // Override isSuccess prop if provided in Storybook args
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
Default.args = {}

export const Loading = {
  render: StoryWithHook,
  args: {
    isLoading: true,
  },
}

export const Error = {
  render: StoryWithHook,
  args: {
    isError: true,
  },
}
