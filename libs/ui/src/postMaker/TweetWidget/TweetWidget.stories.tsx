import { Meta, Story } from '@storybook/react'

import { Container } from '../../components'
import { TWEET_MOCKS } from '../../mocks'
import { TweetWidget, TweetWidgetProps } from './TweetWidget'

export default {
  component: TweetWidget,
  title: 'PostMaker/TweetWidget',
  args: {
    title: 'Tweets',
    tweets: TWEET_MOCKS,
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<TweetWidgetProps>

const Template: Story<TweetWidgetProps> = args => <TweetWidget {...args} />

export const Default = Template.bind({})

export const Empty = Template.bind({})
Empty.args = {
  tweets: [],
}
