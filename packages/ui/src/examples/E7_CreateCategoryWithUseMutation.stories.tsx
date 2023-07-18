import { Meta, StoryObj } from '@storybook/react'

import { CreateCategoryWithUseMutation } from './E7_CreateCategoryWithUseMutation'
import { Container } from '../components'

export default {
  component: CreateCategoryWithUseMutation,
  title: 'Examples/CreateCategoryWithUseMutation',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof CreateCategoryWithUseMutation>

type Story = StoryObj<typeof CreateCategoryWithUseMutation>

export const Default: Story = {}
