import { Story, Meta } from '@storybook/react'

import { Container } from '../../components'
import { TOPICS_MOCK } from '../../mocks'
import { TopicCard } from './index'
import { TopicCardProps } from './types'

export default {
  title: 'Admin/TopicCard',
  component: TopicCard,
  args: {
    ...TOPICS_MOCK.data.data[0],
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
