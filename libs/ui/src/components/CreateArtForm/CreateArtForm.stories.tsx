import { useState } from 'react'

import { Story, Meta } from '@storybook/react'

import { CreateArtForm } from '.'
import { CATEGORY_MOCKS, USER_MOCKS } from '../../mocks'
import { CreateArtFormProps, CreateArtFormFieldValues } from './types'

export default {
  title: 'Forms/CreateArtForm',
  component: CreateArtForm,
} as Meta<CreateArtFormProps>

const Template: Story<CreateArtFormProps> = args => {
  const [isLoading, setIsLoading] = useState(false)
  const handleCreateArt = async (data: CreateArtFormFieldValues) => {
    setIsLoading(true)
    setTimeout(() => {
      alert(JSON.stringify(data))
      setIsLoading(false)
    }, 2000)
  }

  return (
    <CreateArtForm
      {...args}
      onCreateArt={handleCreateArt}
      isLoading={isLoading}
      categories={CATEGORY_MOCKS.data}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  errorMessage: 'There is a error',
}
export const Auth = Template.bind({})
Auth.args = {
  auth: {
    isLoggedIn: true,
    user: USER_MOCKS[0],
    token: 'token',
  },
}
