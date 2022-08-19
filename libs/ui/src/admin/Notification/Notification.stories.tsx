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
  title: 'congratulations',
  description: 'you made it :D',
  isOpen: true,
}
