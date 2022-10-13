import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { UseMutation } from './5_UseMutation'

export default {
  component: UseMutation,
  title: 'Example/E4_UseMutation',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof UseMutation>

const Template: Story = () => <UseMutation />

export const Default = Template.bind({})
