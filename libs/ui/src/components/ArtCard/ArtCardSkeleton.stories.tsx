import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Container } from '../Container'
import { ArtCardBase } from './ArtCardBase'
import { ArtCardSkeleton } from './ArtCardSkeleton'

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
} as ComponentMeta<typeof ArtCardBase>

const Template: ComponentStory<typeof ArtCardSkeleton> = args => {
  return <ArtCardSkeleton {...args} isMasonry={args.isMasonry || false} />
}

export const Default = Template.bind({})
Default.args = {}

export const Masonry = Template.bind({})
Masonry.args = {
  isMasonry: true,
}
