import { Box } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { Container } from '../Container'
import { MasonryGrid, MasonryGridProps } from './MasonryGrid'

export default {
  component: MasonryGrid,
  title: 'Shared/MasonryGrid',
  decorators: [
    Story => (
      <Container maxW="container.lg">
        <Story />
      </Container>
    ),
  ],
} as Meta<MasonryGridProps>

const Template: Story<MasonryGridProps> = args => {
  return (
    <MasonryGrid {...args}>
      {Array.from({ length: 20 }, (_, idx) => idx).map(item => {
        const height = Math.floor(Math.random() * 200) + 50

        return <Box key={item} bg="primary.100" h={`${height}px`} />
      })}
    </MasonryGrid>
  )
}

export const Default = Template.bind({})
