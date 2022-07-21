import { ComponentStory, ComponentMeta } from '@storybook/react'

import { COLLECTIONS } from '../../mocks'
import { CollectionBook } from './CollectionBook'

export default {
  component: CollectionBook,
  title: 'Shared/CollectionBook',
} as ComponentMeta<typeof CollectionBook>

const Template: ComponentStory<typeof CollectionBook> = args => (
  <CollectionBook
    {...args}
    collection={COLLECTIONS[0]}
    title="Art Stop Collection"
    logo="assets/images/kunsthalte.jpg"
  />
)

export const Default = Template.bind({})
