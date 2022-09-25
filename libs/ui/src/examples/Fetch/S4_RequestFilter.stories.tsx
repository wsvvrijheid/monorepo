import { Container } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { RequestFilter, RequestFilterProps } from './E4_RequestFilter'

export default {
  component: RequestFilter,
  title: 'Example/E4_RequestFilter',
  args: {
    initialValue: 'a',
  },
  decorators: [Story => <Container maxW="container.xl">{Story()}</Container>],
} as Meta<typeof Notification>

const Template: Story<RequestFilterProps> = args => <RequestFilter {...args} />

export const Default = Template.bind({})
