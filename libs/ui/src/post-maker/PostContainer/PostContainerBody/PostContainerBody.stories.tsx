import { ComponentMeta, ComponentStory } from '@storybook/react'
import { POST_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../../../components'
import { PostContainerBody } from './PostContainerBody'

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
} as ComponentMeta<typeof PostContainerBody>

const Template: ComponentStory<typeof PostContainerBody> = () => {
  return <PostContainerBody postImage={POST_MOCKS.tr.data[0].image.url} />
}

export const Default = Template.bind({})
