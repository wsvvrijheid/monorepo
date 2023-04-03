import { Meta, StoryFn } from '@storybook/react'

import { PostContainerButtons } from './PostContainerButtons'
import { Container } from '../../../components'

export default {
  title: 'PostMaker/PostContainerButtons',
  component: PostContainerButtons,
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof PostContainerButtons>

const Template: StoryFn<typeof PostContainerButtons> = () => {
  return <PostContainerButtons />
}

export const Default = Template.bind({})
