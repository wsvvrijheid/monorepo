import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TIMELINE_TWEET_MOCKS } from '@wsvvrijheid/mocks'
import { sample } from 'lodash'

import { Container } from '../../components'
import { TimelineTweet } from './TimelineTweet'

export default {
  component: TimelineTweet,
  title: `Admin/TimelineTweetBase`,
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
  args: {
    onEdit: tweet => alert(JSON.stringify(tweet)),
    onSave: tweet => alert(JSON.stringify(tweet)),
  },
} as ComponentMeta<typeof TimelineTweet>

const Template: ComponentStory<typeof TimelineTweet> = args => (
  <TimelineTweet {...args} />
)

export const Default = Template.bind({})
Default.args = {
  tweet: sample(TIMELINE_TWEET_MOCKS),
  user: {
    name: 'Samen voor Vrijheid en Verbinding',
    profile:
      'https://pbs.twimg.com/profile_images/1330947365411418113/nmZOHsnR_normal.jpg',
    username: 'samenvvv',
  },
}
