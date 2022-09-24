import { Meta, Story } from '@storybook/react'
import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'
import { sample } from 'lodash'

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
Default.args = {
  auth: {
    user: null,
    isLoggedIn: false,
    token: null,
  },
}

export const Auth = Template.bind({})
Auth.args = {
  auth: {
    user: mapSessionUser(sample(USER_MOCKS)),
    isLoggedIn: true,
    token: 'fake-token',
  },
} as CreateCollectionModalProps
