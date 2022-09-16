import { Meta, Story } from '@storybook/react'

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
    user: {
      id: 38,
      username: 'Artist',
      email: 'artist@samenvvv.nl',
      provider: 'local',
      confirmed: true,
      isAuthenticated: true,
    },
    isLoggedIn: true,
    token: 'fake-token',
  },
}
