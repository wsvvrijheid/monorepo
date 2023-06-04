import { StoryObj, Meta } from '@storybook/react'

import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'

import { CollectionBook } from '.'
import { CollectionBookProps } from './types'

export default {
  component: CollectionBook,
  title: 'Templates/CollectionBook',
} as Meta<CollectionBookProps>

type Story = StoryObj<CollectionBookProps>

export const Default: Story = {
  args: {
    collection: COLLECTION_MOCKS.tr.data[0],
    title: 'Art Station Collection',
    logo: '/images/kunsthalte.png',
  },
}
