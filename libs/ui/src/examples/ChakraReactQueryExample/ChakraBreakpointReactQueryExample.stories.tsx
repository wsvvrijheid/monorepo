import { Meta, Story } from '@storybook/react'
import { useMutation } from 'react-query'

import {
  ChakraBreakpointExample,
  ChakraBreakpointExampleProps,
} from './ChakraBreakpointExample'

export default {
  component: ChakraBreakpointExample,
  title: 'Example/ChakraBreakpointReactQueryExample',
} as Meta<ChakraBreakpointExampleProps> // or ComponentMeta<typeof ChakraBreakpointExample>

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

// or ComponentStory<typeof ChakraBreakpointExample>
const Template: Story<ChakraBreakpointExampleProps> = args => {
  const { mutate, isSuccess, isError, isLoading } = useMutation({
    mutationKey: 'sendMessage',
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

export const Default = Template.bind({})
Default.args = {}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}

export const Error = Template.bind({})
Error.args = {
  isError: true,
}
