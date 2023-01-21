import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'

import { ArtCard } from './ArtCard'
import { Container } from '../Container'

export default {
  component: ArtCard,
  title: 'Shared/ArtCard',
  args: {
    art: ART_MOCKS.tr.data[0],
    user: USER_MOCKS[0],
  },
  decorators: [Story => <Container maxW="container.sm">{Story()}</Container>],
} as ComponentMeta<typeof ArtCard>

const Template: ComponentStory<typeof ArtCard> = args => {
  return <ArtCard {...args} />
}

export const Default = Template.bind({})
Default.args = {}
