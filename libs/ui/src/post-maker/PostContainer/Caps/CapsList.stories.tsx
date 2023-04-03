import { Meta, StoryFn } from '@storybook/react'

import { POST_MOCKS } from '@wsvvrijheid/mocks'

import { CapsList } from './CapsList'
import { Container } from '../../../components'

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
} as Meta<typeof CapsList>

const Template: StoryFn<typeof CapsList> = () => (
  <CapsList sharedPosts={[]} posts={POST_MOCKS.tr.data} />
)

export const Default = Template.bind({})
