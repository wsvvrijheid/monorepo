import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sample } from 'lodash'

import { PLATFORM_MOCKS } from '@wsvvrijheid/mocks'

import { Card } from './Card'
import { Container } from '../Container'

export default {
  component: Card,
  title: 'Shared/Card',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = args => {
  return <Card {...args} />
}

const { name_en, description_en, image } = sample(PLATFORM_MOCKS.data)!

export const Default = Template.bind({})
Default.args = {
  title: name_en,
  description: description_en,
  image,
}

export const Rounded = Template.bind({})
Rounded.args = {
  title: name_en,
  description: description_en,
  image,
  rounded: true,
}
