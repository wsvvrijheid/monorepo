import { SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { CardBase, CardBaseProps } from './CardBase'
import { Container } from '../../components'

export default {
  title: 'Admin/CardBase',
  component: CardBase,
  args: {
    art: ART_MOCKS.tr.data[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<CardBaseProps>

const Template: Story<CardBaseProps> = args => {
  return <CardBase onClick={() => alert('art click')} {...args} />
}

const GridTemplate: Story = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {ART_MOCKS.tr.data.map((art, i) => (
        <CardBase onClick={() => alert('art click')} key={art.id} art={art} />
      ))}
    </SimpleGrid>
  )
}

export const Default = Template.bind({})

export const Grid = GridTemplate.bind({})
