import { StoryObj, Meta } from '@storybook/react'

import { ArtCardBase } from './ArtCardBase'
import { ArtCardSkeleton } from './ArtCardSkeleton'
import { Container } from '../Container'

export default {
  component: ArtCardSkeleton,
  title: 'Shared/ArtCardSkeleton',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof ArtCardBase>

type Story = StoryObj<typeof ArtCardBase>

export const Default: Story = {}

export const Masonry: Story = {
  args: {
    isMasonry: true,
  },
}
