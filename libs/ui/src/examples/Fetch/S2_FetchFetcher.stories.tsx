import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { FetchFetcher } from './E2_FetchFetcher'

export default {
  component: FetchFetcher,
  title: 'Example/E2_FetchFetcher',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof Notification>

const Template: Story = () => <FetchFetcher />

export const Default = Template.bind({})
