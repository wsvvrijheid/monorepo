// import { Box, SimpleGrid } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'

import { TİMELİNE_MOCKS } from '@wsvvrijheid/mocks'

import { TimelineBoard } from './TimelineBoard'
import { Container } from '../../components'

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

type Story = StoryObj<typeof TimelineBoard>

export const Default: Story = {}
