import { Container } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { Notification } from './Notification'
import { NotificationProps } from './types'

export default {
  component: Notification,
  title: 'Example/Notification',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof Notification>

type Story = StoryObj<NotificationProps>

export const Default: Story = {
  args: {
    status: 'success',
    title: 'Success',
    description: 'Message has ben sent successfully',
    isOpen: true,
  },
}

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Error',
    description: 'An error occured while sending your message',
    isOpen: true,
  },
}
