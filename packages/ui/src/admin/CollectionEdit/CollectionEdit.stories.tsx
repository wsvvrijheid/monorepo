import { Container } from '@chakra-ui/react'
import { StoryFn, Meta } from '@storybook/react'

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
} as Meta<typeof CollectionEdit>

const Template: StoryFn<typeof CollectionEdit> = args => {
  return <CollectionEdit {...args} collection={COLLECTION_MOCKS.tr.data[0]} />
}

export const Default = Template.bind({})
