import { Meta, StoryFn } from '@storybook/react'

import { TWEET_MOCKS } from '@wsvvrijheid/mocks'

import { TweetWidget } from './TweetWidget'

export default {
  title: 'PostMaker/TweetWidget',
  component: TweetWidget,
} as Meta<typeof TweetWidget>

const Template: StoryFn<typeof TweetWidget> = args => {
  return <TweetWidget {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'TweetWidget',
  tweets: TWEET_MOCKS,
}

export const Empty = Template.bind({})
Empty.args = {
  title: 'TweetWidget',
  tweets: null,
}
