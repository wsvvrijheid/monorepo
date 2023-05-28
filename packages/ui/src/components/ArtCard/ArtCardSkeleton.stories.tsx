import { StoryFn, Meta } from '@storybook/react'

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

const Template: StoryFn<typeof ArtCardSkeleton> = args => {
  return <ArtCardSkeleton {...args} isMasonry={args.isMasonry || false} />
}

export const Default = Template.bind({})
Default.args = {}

export const Masonry = Template.bind({})
Masonry.args = {
  isMasonry: true,
}