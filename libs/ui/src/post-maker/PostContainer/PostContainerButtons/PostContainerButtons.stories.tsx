import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Container } from '../../../components'
import { PostContainerButtons } from './PostContainerButtons'

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
} as ComponentMeta<typeof PostContainerButtons>

const Template: ComponentStory<typeof PostContainerButtons> = () => {
  return <PostContainerButtons />
}

export const Default = Template.bind({})
