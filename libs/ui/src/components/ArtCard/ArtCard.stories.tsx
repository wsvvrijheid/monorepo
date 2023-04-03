import { StoryFn, Meta } from '@storybook/react'

import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'

import { ArtCard } from './ArtCard'
import { Container } from '../Container'

export default {
  component: ArtCard,
  title: 'Shared/ArtCard',
  args: {
    art: ART_MOCKS.data[0],
    user: USER_MOCKS[0],
  },
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as Meta<typeof ArtCard>

const Template: StoryFn<typeof ArtCard> = args => {
  return <ArtCard {...args} />
}

export const Default = Template.bind({})
Default.args = {}
