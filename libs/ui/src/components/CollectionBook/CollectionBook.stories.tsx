import { ComponentStory, ComponentMeta } from '@storybook/react'

import { COLLECTION_MOCKS } from '../../mocks'
import { CollectionBook } from './CollectionBook'

export default {
  component: CollectionBook,
  title: 'Shared/CollectionBook',
} as ComponentMeta<typeof CollectionBook>

const Template: ComponentStory<typeof CollectionBook> = args => (
  <CollectionBook
    {...args}
    collection={COLLECTION_MOCKS.data[0]}
    title="Art Stop Collection"
    logo="/assets/images/kunsthalte.jpg"
  />
)

export const Default = Template.bind({})
