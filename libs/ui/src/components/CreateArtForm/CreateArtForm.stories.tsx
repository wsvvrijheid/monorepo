import { Meta, Story } from '@storybook/react'
import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'
import { sample } from 'lodash'

import { CreateArtForm } from '.'
import { CreateArtFormProps } from './types'

export default {
  title: 'Forms/CreateArtForm',
  component: CreateArtForm,
} as Meta<CreateArtFormProps>

const Template: Story<CreateArtFormProps> = args => {
  return <CreateArtForm {...args} />
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
} as CreateArtFormProps
