import { Meta, StoryFn } from '@storybook/react'

import { PostArchive } from './PostArchive'
import { Container } from '../../components'

export default {
  component: PostArchive,
  title: 'PostMaker/PostArchive',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof PostArchive>

const Template: StoryFn<typeof PostArchive> = () => <PostArchive />

export const Default = Template.bind({})
