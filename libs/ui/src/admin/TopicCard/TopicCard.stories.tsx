import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { useTopic } from '@wsvvrijheid/utils'

import { Container } from '../../components'
import { TOPICS_MOCK } from '../../mocks'
import { TopicCard } from './index'
import { TopicCardProps } from './types'

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
  return <TopicCard {...args} variant={args.variant} />
}

const GridTemplate: Story = () => {
  const { data, refetch, isLoading } = useTopic()
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {data &&
        data.map((topic, i) => (
          <Box key={topic.url} gridColumn={i === 0 ? 'span 4' : undefined}>
            <TopicCard
              variant={i === 0 ? 'horizontal' : 'vertical'}
              hideDescription={i > 4 && i < 8}
              topic={topic}
              userId={132}
              onTopicRecommended={refetch}
              isLoading={isLoading}
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
