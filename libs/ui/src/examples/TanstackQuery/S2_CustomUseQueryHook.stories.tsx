import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { CustomUseQueryHook } from './E2_CustomUseQueryHook'

export default {
  component: CustomUseQueryHook,
  title: 'Example/E2_CustomUseQueryHook',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof CustomUseQueryHook>

const Template: Story = () => <CustomUseQueryHook />

export const Default = Template.bind({})
