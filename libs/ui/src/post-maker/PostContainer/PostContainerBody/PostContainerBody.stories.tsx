import { Meta, StoryFn } from '@storybook/react'

import { POST_MOCKS } from '@wsvvrijheid/mocks'

import { PostContainerBody } from './PostContainerBody'
import { Container } from '../../../components'

export default {
  title: 'PostMaker/PostContainerBody',
  component: PostContainerBody,
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof PostContainerBody>

const Template: StoryFn<typeof PostContainerBody> = () => {
  return <PostContainerBody post={POST_MOCKS.tr.data[0]} />
}

export const Default = Template.bind({})
