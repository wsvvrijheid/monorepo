// import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { TİMELİNE_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../../components'
import { TimelineBoard } from './TimelineBoard'

export default {
  title: 'Admin/TimelineBoard',
  component: TimelineBoard,
  args: {
    timeline: TİMELİNE_MOCKS[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = args => {
  return <TimelineBoard timelines={args['timeline']} {...args} />
}

export const Default = Template.bind({})
Default.args = {}
