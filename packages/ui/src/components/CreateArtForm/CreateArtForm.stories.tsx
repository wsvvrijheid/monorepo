import { Meta, Story } from '@storybook/react'

import { CreateArtForm } from './CreateArtForm'
import { CreateArtFormProps } from './types'

export default {
  title: 'Forms/CreateArtForm',
  component: CreateArtForm,
} as Meta<CreateArtFormProps>

const Template: Story<CreateArtFormProps> = args => {
  return <CreateArtForm {...args} />
}

export const Default = Template.bind({})
Default.args = {}
