// import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { Container } from '../../components'
import { TOPICS_MOCK } from '../../mocks'
import { TopicCardBase } from './TopicCardBase'
import { TopicCardBaseProps } from './types'

export default {
  title: 'Admin/TopicCardBase',
  component: TopicCardBase,
  args: {
    topic: TOPICS_MOCK.data.data[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<TopicCardBaseProps>

const Template: Story<TopicCardBaseProps> = args => {
  return <TopicCardBase {...args} />
}

export const Default = Template.bind({})
