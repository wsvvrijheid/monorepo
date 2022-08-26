import { ComponentStory, ComponentMeta } from '@storybook/react'
import { API_URL } from '@wsvvrijheid/config'
import { PLATFORM_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../Container'
import { Card } from './Card'

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

const { name_en, description_en, image } = PLATFORM_MOCKS.data[0]
const src = `${API_URL}${image?.url}`

export const Default = Template.bind({})
Default.args = {
  title: name_en,
  description: description_en,
  image: src,
}

export const Rounded = Template.bind({})
Rounded.args = {
  title: name_en,
  description: description_en,
  image: src,
  rounded: true,
}
