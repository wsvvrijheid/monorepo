import { Box, Grid } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'

import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'
import { useRequestCollection } from '@wsvvrijheid/services'
import { Collection } from '@wsvvrijheid/types'

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

type Story = StoryObj<CollectionListProps>

const StoryWithHook: StoryFn<CollectionListProps> = args => {
  const router = useRouter()

  const { data } = useRequestCollection<Collection>({
    url: 'api/collections',
    locale: router.locale,
  })

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <CollectionList collectionData={data?.data || args.collectionData} />
      </Box>
    </Grid>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
