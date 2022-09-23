import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { Container } from '../../components'
import { TOPIC_MOCK } from '../../mocks'
import { TopicCard } from './index'
import { TopicCardProps } from './types'

export default {
  title: 'Admin/TopicCard',
  component: TopicCard,
  args: {
    news: TOPIC_MOCK,
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
  return <TopicCard {...args} variant={args.variant} />
}

const GridTemplate: Story = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {[
        TOPIC_MOCK,
        TOPIC_MOCK,
        TOPIC_MOCK,
        TOPIC_MOCK,
        TOPIC_MOCK,
        TOPIC_MOCK,
        TOPIC_MOCK,
        TOPIC_MOCK,
      ].map((news, i) => (
        <Box key={news.id} gridColumn={i === 0 ? 'span 4' : undefined}>
          <TopicCard
            variant={i === 0 ? 'horizontal' : 'vertical'}
            hideDescription={i > 4}
            news={news}
            userId={132}
          />
        </Box>
      ))}
    </SimpleGrid>
  )
}

export const Default = Template.bind({})

export const Horizontal = Template.bind({})
Horizontal.args = {
  variant: 'horizontal',
}

export const Simple = Template.bind({})
Simple.args = {
  variant: 'vertical',
  hideDescription: true,
}

export const Grid = GridTemplate.bind({})
