import { Container } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ACTIVITY_MOCKS } from '@wsvvrijheid/mocks'

import { ActivityEdit } from './ActivityEdit'

export default {
  component: ActivityEdit,
  title: 'Admin/ActivityEdit',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof ActivityEdit>

const Template: ComponentStory<typeof ActivityEdit> = args => {
  return <ActivityEdit {...args} activity={ACTIVITY_MOCKS.tr.data[0]} />
}

export const Default = Template.bind({})
