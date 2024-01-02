import { Meta, StoryObj } from '@storybook/react'

import { ResponsiveCard} from './ResponsiveCard'
import { Container } from '../Container'


export default {
  component: ResponsiveCard,
  title: 'Examples/ResponsiveCard',
  decorators: [Story => <Container maxW="container.sm" m="50px auto" >{Story()}</Container>],
} as Meta<typeof ResponsiveCard>

type Story = StoryObj<typeof ResponsiveCard>

export const Default: Story = {}
