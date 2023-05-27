// import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { TopicCard } from './TopicCard'
import { TopicCardProps } from './types'
import { Container } from '../../components'
import { TOPICS_MOCK } from '../../mocks'

export default {
  title: 'Admin/TopicCard',
  component: TopicCard,
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
} as Meta<TopicCardProps>

const Template: Story<TopicCardProps> = args => {
  return <TopicCard {...args} />
}

export const Default = Template.bind({})
