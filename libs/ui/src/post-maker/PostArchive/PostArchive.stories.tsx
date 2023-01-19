import { ComponentMeta, ComponentStory } from '@storybook/react'

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
} as ComponentMeta<typeof PostArchive>

const Template: ComponentStory<typeof PostArchive> = () => <PostArchive />

export const Default = Template.bind({})
