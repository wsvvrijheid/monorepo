import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { MultiFetchQuery } from './1_MultiFetchQuery'

export default {
  component: MultiFetchQuery,
  title: 'Example/E1_MultiFetchQuery',
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof MultiFetchQuery>

const Template: Story = () => <MultiFetchQuery />

export const Default = Template.bind({})
