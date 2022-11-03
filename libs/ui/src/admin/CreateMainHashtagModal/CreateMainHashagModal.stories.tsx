import { Meta, Story } from '@storybook/react'
import { MENTION_MOCKS } from '@wsvvrijheid/mocks'

import { CreateMainHashtagModal } from './CreateMainHashtagModal'
import { CreateMainHashtagModalProps } from './types'
const mentionMock = MENTION_MOCKS.data
console.log('mention mock', mentionMock)
export default {
  title: 'Admin/CreateMainHashtagForm',
  component: CreateMainHashtagModal,
  args: {
    mentions: mentionMock,
  },
} as Meta<CreateMainHashtagModalProps>

const Template: Story<CreateMainHashtagModalProps> = args => {
  return <CreateMainHashtagModal {...args} />
}

export const Default = Template.bind({})
Default.args = {} as CreateMainHashtagModalProps
