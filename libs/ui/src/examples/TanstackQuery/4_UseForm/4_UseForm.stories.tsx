import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { UseForm } from './4_UseForm'

export default {
  component: UseForm,
  title: 'Example/E4_UseForm',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof UseForm>

const Template: Story = () => <UseForm />

export const Default = Template.bind({})
