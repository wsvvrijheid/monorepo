import { Meta, Story } from '@storybook/react'

import { CreateCollectionModal } from './CreateCollectionModal'
import { CreateCollectionModalProps } from './types'

export default {
  title: 'Admin/CreateCollectionForm',
  component: CreateCollectionModal,
} as Meta<CreateCollectionModalProps>

const Template: Story<CreateCollectionModalProps> = args => {
  return <CreateCollectionModal {...args} />
}

export const Default = Template.bind({})
Default.args = {} as CreateCollectionModalProps
