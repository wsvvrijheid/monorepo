import { Story, Meta } from '@storybook/react'

import { COLLECTION_MOCKS } from '../../mocks'
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
    logo="/assets/images/kunsthalte.jpg"
  />
)

export const Default = Template.bind({})
