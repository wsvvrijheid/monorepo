import { Meta, Story } from '@storybook/react'
import { HASHTAG_MOCKS, MENTION_MOCKS } from '@wsvvrijheid/mocks'

import { CreateHashtagPostModal } from './CreateHashtagPostModal'
import { CreateHashtagPostModalProps } from './types'
const mentionMock = MENTION_MOCKS.data
console.log('mention mock', mentionMock)
export default {
  title: 'Admin/CreateHashtagPostForm',
  component: CreateHashtagPostModal,
  args: {
    hashtag: HASHTAG_MOCKS,
  },
} as Meta<CreateHashtagPostModalProps>

const Template: Story<CreateHashtagPostModalProps> = args => {
  return <CreateHashtagPostModal {...args} />
}

export const Default = Template.bind({})
Default.args = {} as CreateHashtagPostModalProps
