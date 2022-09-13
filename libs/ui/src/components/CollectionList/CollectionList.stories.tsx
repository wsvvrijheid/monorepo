import { Box, Grid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'
import { useCollections } from '@wsvvrijheid/utils'

import { CollectionList, CollectionListProps } from './CollectionList'

export default {
  component: CollectionList,
  title: 'Shared/CollectionList',
  args: {
    collectionData: COLLECTION_MOCKS.en.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<CollectionListProps>

const Template: Story<CollectionListProps> = args => {
  const { data } = useCollections()

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <CollectionList collectionData={data || args.collectionData} />
      </Box>
    </Grid>
  )
}

export const Default = Template.bind({})
