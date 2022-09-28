import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import {
  RequestNestedFilter,
  RequestNestedFilterProps,
} from './E5_RequestNestedFilter'

export default {
  component: RequestNestedFilter,
  title: 'Example/E4_RequestNestedFilter',
  args: {
    initialValue: 'a',
  },
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof RequestNestedFilter>

const Template: Story<RequestNestedFilterProps> = args => (
  <RequestNestedFilter {...args} />
)

export const Default = Template.bind({})
