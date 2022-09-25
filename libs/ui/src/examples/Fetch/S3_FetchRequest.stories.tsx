import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { FetchRequest } from './E3_FetchRequest'

export default {
  component: FetchRequest,
  title: 'Example/E3_FetchRequest',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof Notification>

const Template: Story = () => <FetchRequest />

export const Default = Template.bind({})
