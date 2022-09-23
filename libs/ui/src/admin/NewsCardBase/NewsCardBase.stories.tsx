import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { Container } from '../../components'
import { NEWS_MOCK } from '../../mocks'
import { NewsCardBase } from './NewsCardBase'
import { NewsCardProps } from './types'

export default {
  title: 'Admin/NewsCardBase',
  component: NewsCardBase,
  args: {
    news: NEWS_MOCK,
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<NewsCardProps>

const Template: Story<NewsCardProps> = args => {
  return <NewsCardBase {...args} variant={args.variant} />
}

const GridTemplate: Story = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {[
        NEWS_MOCK,
        NEWS_MOCK,
        NEWS_MOCK,
        NEWS_MOCK,
        NEWS_MOCK,
        NEWS_MOCK,
        NEWS_MOCK,
        NEWS_MOCK,
      ].map((news, i) => (
        <Box key={news.id} gridColumn={i === 0 ? 'span 4' : undefined}>
          <NewsCardBase
            variant={i === 0 ? 'horizontal' : 'vertical'}
            hideDescription={i > 4}
            news={news}
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
