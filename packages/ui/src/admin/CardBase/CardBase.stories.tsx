import { SimpleGrid } from '@chakra-ui/react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'

import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { CardBase, CardBaseProps } from './CardBase'
import { Container } from '../../components'

export default {
  title: 'Admin/CardBase',
  component: CardBase,
  args: {
    art: ART_MOCKS.data[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<CardBaseProps>

type Story = StoryObj<CardBaseProps>

const GridTemplate: StoryFn = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {ART_MOCKS.data.map(art => (
        <CardBase onClick={() => alert('art click')} key={art.id} art={art} />
      ))}
    </SimpleGrid>
  )
}

export const Default: Story = {}

export const Grid: Story = {
  render: GridTemplate,
}
