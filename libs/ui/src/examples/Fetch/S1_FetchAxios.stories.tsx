import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { FetcAxios } from './E1_FetchAxios'

export default {
  component: FetcAxios,
  title: 'Example/E1_FetchAxios',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof Notification>

const Template: Story = () => <FetcAxios />

export const Default = Template.bind({})
