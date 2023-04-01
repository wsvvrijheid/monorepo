import { Box, Button, Container, useDisclosure } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sample } from 'lodash'

import {
  ACTIVITY_MOCKS,
  ANNOUNCEMENT_MOCKS,
  BLOG_MOCKS,
  HASHTAG_MOCKS,
} from '@wsvvrijheid/mocks'

import { TranslateModal } from './TranslateModal'

export default {
  component: TranslateModal,
  title: 'Admin/TranslateModal',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof TranslateModal>

const Template: ComponentStory<typeof TranslateModal> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleApprove = (Id: number, content: string) => {
    console.log('Approve data here')
    onClose()
  }

  const handleSizeClick = () => {
    onOpen()
  }
  const onSave = (data: string) => {
    alert(`${data} saved`)
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Open Modal`}
      </Button>

      <TranslateModal
        {...args}
        isOpen={isOpen}
        onApprove={handleApprove}
        onClose={onClose}
        onSave={onSave}
      />
    </Box>
  )
}

export const ActivityModel = Template.bind({})
ActivityModel.args = {
  model: sample(ACTIVITY_MOCKS.tr.data),
}

export const AnnouncementModel = Template.bind({})
AnnouncementModel.args = {
  model: sample(ANNOUNCEMENT_MOCKS.tr.data),
}

export const BlogModel = Template.bind({})
BlogModel.args = {
  model: sample(BLOG_MOCKS.tr.data),
}

export const HashtagModel = Template.bind({})
HashtagModel.args = {
  model: sample(HASHTAG_MOCKS.tr.data),
}
