import { Meta, StoryObj } from '@storybook/react'

import { StackExample } from './StackExample'

export default {
  component: StackExample,
  title: 'Example/StackExample',
} as Meta<typeof StackExample>

type Story = StoryObj<typeof StackExample>

export const Default: Story = {}
