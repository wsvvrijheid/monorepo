import { Meta, StoryObj } from '@storybook/react'

import { ResponsiveCard, ResponsiveCardColumn } from './ResponsiveCard'
import { Container } from '../Container'


export default {
  component: ResponsiveCard, ResponsiveCardColumn, 
  title: 'Examples/ResponsiveCard',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof ResponsiveCard>

type Story = StoryObj<typeof ResponsiveCard>

export const Default: Story = {}
