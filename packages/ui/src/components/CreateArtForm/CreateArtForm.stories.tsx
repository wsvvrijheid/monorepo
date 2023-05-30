import { Meta, StoryObj } from '@storybook/react'

import { CreateArtForm } from './CreateArtForm'
import { CreateArtFormProps } from './types'

export default {
  title: 'Forms/CreateArtForm',
  component: CreateArtForm,
} as Meta<CreateArtFormProps>

type Story = StoryObj<CreateArtFormProps>

export const Default: Story = {}
