import { Container, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'
import { useCollections } from '@wsvvrijheid/utils'

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
  const { data, isLoading } = useCollections()
  return (
    <Box>
      <CollectionEdit
        {...args}
        collections={
          !isLoading
            ? data
            : [...COLLECTION_MOCKS.tr.data, ...COLLECTION_MOCKS.nl.data]
        }
      />
    </Box>
  )
}

export const Default = Template.bind({})
