import { useState } from 'react'

import { Meta, Story } from '@storybook/react'

import { sleep } from '@wsvvrijheid/utils'

import {
  ChakraBreakpointExample,
  ChakraBreakpointExampleProps,
} from './ChakraBreakpointExample'

export default {
  component: ChakraBreakpointExample,
  title: 'Example/ChakraBreakpointExample',
} as Meta<ChakraBreakpointExampleProps> // or Meta<typeof ChakraBreakpointExample>

// or StoryFn<typeof ChakraBreakpointExample>
const Template: Story<ChakraBreakpointExampleProps> = args => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const sendMessage = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      setIsSuccess(false)

      const random = Math.random()

      await sleep(1000) // simulate network delay

      if (random > 0.5) {
        throw Promise.reject('Error')
      }

      setIsLoading(false)
      setIsSuccess(true)

      return 'Success'
    } catch (error) {
      setIsError(true)
      setIsLoading(false)

      return 'Error'
    }
  }

  return (
    <ChakraBreakpointExample
      onSend={sendMessage} // Simulate a network request
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
