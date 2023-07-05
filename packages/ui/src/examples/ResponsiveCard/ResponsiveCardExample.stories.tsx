import { Meta, StoryObj } from '@storybook/react'

import { ResponsiveCardExample } from './ResponsiveCardExample'

export default {
  component: ResponsiveCardExample,
  title: 'Example/ResponsiveCardExample',
} as Meta<typeof ResponsiveCardExample>

type Story = StoryObj<typeof ResponsiveCardExample>

export const Default: Story = {}
