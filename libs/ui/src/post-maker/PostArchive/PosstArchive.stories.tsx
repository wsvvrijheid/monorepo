import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Container } from '../../components'
import { PostArchive } from './PostArchive'

export default {
  component: PostArchive,
  title: 'PostMaker/PostArchive',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof PostArchive>

const Template: ComponentStory<typeof PostArchive> = () => <PostArchive />

export const Default = Template.bind({})
