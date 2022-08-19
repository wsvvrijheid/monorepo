import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import Notification from './Notification'
import { NotificationProps } from './types'

export default {
  component: Notification,
  title: 'Admin/Notification',
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof Notification>

const Template: Story<NotificationProps> = args => <Notification {...args} />

export const Default = Template.bind({})
Default.args = {
  status: 'success',
  title: 'Success',
  description: 'Message has ben sent successfully',
  isOpen: true,
}

export const Error = Template.bind({})
Error.args = {
  status: 'error',
  title: 'Error',
  description: 'An error occured while sending your message',
  isOpen: true,
}