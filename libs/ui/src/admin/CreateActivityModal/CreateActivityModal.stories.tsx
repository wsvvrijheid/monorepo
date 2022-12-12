import { Meta, Story } from '@storybook/react'

import { CreateActivityModal } from './CreateActivityModal'
import { CreateActivityModalProps } from './types'

export default {
  title: 'Admin/CreateActivityForm',
  component: CreateActivityModal,
} as Meta<CreateActivityModalProps>

const Template: Story<CreateActivityModalProps> = args => {
  return <CreateActivityModal {...args} />
}

export const Default = Template.bind({})
Default.args = {} as CreateActivityModalProps
