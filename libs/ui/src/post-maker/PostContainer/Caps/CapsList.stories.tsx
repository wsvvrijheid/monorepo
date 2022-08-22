import { ComponentMeta, ComponentStory } from '@storybook/react'
import { POST_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../../../components'
import { CapsList } from './CapsList'

export default {
  component: CapsList,
  title: 'PostMaker/CapsList',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof CapsList>

const Template: ComponentStory<typeof CapsList> = () => (
  <CapsList sharedPosts={[]} posts={POST_MOCKS.data} />
)

export const Default = Template.bind({})
