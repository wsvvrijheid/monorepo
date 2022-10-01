import { Box, SimpleGrid } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { ArtAddToCollectionCard } from './ArtAddToCollectionCard'
import { ArtAddToCollectionCardProps } from './types'

export default {
  title: 'Admin/ArtAddToCollectionCard',
  component: ArtAddToCollectionCard,
  args: {
    isAdded: true,
    art: ART_MOCKS.tr.data[0],
    onAdd: () => {
      alert('Added')
    },
    onRemove: () => {
      alert('Removed')
    },
  },
} as Meta<ArtAddToCollectionCardProps>

const Template: Story<ArtAddToCollectionCardProps> = args => (
  <ArtAddToCollectionCard {...args} />
)

export const Default = Template.bind({})

const GridTemplate: Story<ArtAddToCollectionCardProps> = args => {
  return (
    <SimpleGrid minChildWidth="300px" spacing="10px">
      {ART_MOCKS.tr.data.map((topic, i) => (
        <Box key={topic.id}>
          <ArtAddToCollectionCard {...args} art={topic} />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export const Grid = GridTemplate.bind({})
Grid.args = {
  onAdd: () => {
    alert('Added')
  },
  onRemove: () => {
    alert('Removed')
  },
  isAdded: true,
}
