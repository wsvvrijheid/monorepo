import { Container, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'

import { CollectionEdit } from './CollectionEdit'

export default {
  component: CollectionEdit,
  title: 'Admin/CollectionEdit',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof CollectionEdit>

const Template: ComponentStory<typeof CollectionEdit> = args => {
  return (
    <Box>
      <CollectionEdit {...args} collection={COLLECTION_MOCKS.tr.data[0]} />
    </Box>
  )
}

export const Default = Template.bind({})
