import { Meta, Story } from '@storybook/react'
import { COLLECTION_MOCKS } from '@wsvvrijheid/mocks'

import { CollectionTemplate, CollectionTempleteProps } from './index'

export default {
  component: CollectionTemplate,
  isLoading: false,
  height: 60,
  width: 80,
  pageShow: 10,
  collection: COLLECTION_MOCKS.en.data,
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<CollectionTempleteProps>

const Template: Story<CollectionTempleteProps> = args => (
  <CollectionTemplate {...args} />
)

export const Default = Template.bind({})
