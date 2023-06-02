import { Meta, StoryObj } from '@storybook/react'

import { ResponsiveCard } from './ResponsiveCard'

export default {
  component: ResponsiveCard,
  title: 'Example/ResponsiveCard',
} as Meta<typeof ResponsiveCard>

type Story = StoryObj<typeof ResponsiveCard>

export const Default: Story = {}
