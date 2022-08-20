import { Story, Meta } from '@storybook/react'
import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'

import { CollectionBook, CollectionBookProps } from './CollectionBook'

export default {
  component: CollectionBook,
  title: 'Shared/CollectionBook',
} as Meta<CollectionBookProps>

const Template: Story<CollectionBookProps> = args => (
  <CollectionBook
    {...args}
    collection={COLLECTION_MOCKS.data[0]}
    title="Art Stop Collection"
    logo="/images/kunsthalte.png"
  />
)

export const Default = Template.bind({})
