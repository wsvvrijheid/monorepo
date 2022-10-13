import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { MutationFn } from './3_MutationFn'

export default {
  component: MutationFn,
  title: 'Example/E3_MutationFn',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof MutationFn>

const Template: Story = () => <MutationFn />

export const Default = Template.bind({})
