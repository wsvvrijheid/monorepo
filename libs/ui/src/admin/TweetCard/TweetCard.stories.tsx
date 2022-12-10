import { Stack } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TWEET_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../../components'
import { TweetCard } from './TweetCard'

export default {
  component: TweetCard,
  title: `Admin/TweetCard`,
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
} as ComponentMeta<typeof TweetCard>

const Template: ComponentStory<typeof TweetCard> = args => (
  <TweetCard {...args} />
)

const ListTemplate = () => (
  <Stack>
    {TWEET_MOCKS.map(tweet => (
      <TweetCard
        key={tweet.id}
        tweet={tweet}
        onEdit={tweet => alert(JSON.stringify(tweet))}
        onSave={tweet => alert(JSON.stringify(tweet))}
        shadow="base"
        rounded={0}
      />
    ))}
  </Stack>
)

export const Default = Template.bind({})
Default.args = {
  tweet: TWEET_MOCKS[2],
}

export const Image = Template.bind({})
Image.args = {
  tweet: TWEET_MOCKS[1],
}

export const Video = Template.bind({})
Video.args = {
  tweet: TWEET_MOCKS[0],
}

export const List = ListTemplate.bind({})