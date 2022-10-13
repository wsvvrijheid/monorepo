import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { MutationAxios } from './2_MutationAxios'

export default {
  component: MutationAxios,
  title: 'Example/E2_MutationSimple',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof MutationAxios>

const Template: Story = () => <MutationAxios />

export const Default = Template.bind({})
