import { Meta, Story } from '@storybook/react'
import { MENTION_MOCKS } from '@wsvvrijheid/mocks'

import { CreateMainHashtagModal } from './CreateMainHashtagModal'
import { CreateMainHashtagModalProps } from './types'
const mentionMock = MENTION_MOCKS.data[0]
console.log('mention mock', mentionMock)
export default {
  title: 'Admin/CreateMainHashtagForm',
  component: CreateMainHashtagModal,
  args: {
    username: mentionMock.username,
  },
} as Meta<CreateMainHashtagModalProps>

const Template: Story<CreateMainHashtagModalProps> = args => {
  return <CreateMainHashtagModal {...args} />
}

export const Default = Template.bind({})
Default.args = {} as CreateMainHashtagModalProps
