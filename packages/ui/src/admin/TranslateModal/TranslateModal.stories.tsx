import { Box, Button, Container, useDisclosure } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
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
} as Meta<typeof TranslateModal>

type Story = StoryObj<typeof TranslateModal>

const StoryWithHooks: StoryFn<typeof TranslateModal> = args => {
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

export const ActivityModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(ACTIVITY_MOCKS.tr.data),
  },
}

export const AnnouncementModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(ANNOUNCEMENT_MOCKS.tr.data),
  },
}

export const BlogModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(BLOG_MOCKS.tr.data),
  },
}

export const HashtagModel: Story = {
  render: StoryWithHooks,
  args: {
    model: sample(HASHTAG_MOCKS.tr.data),
  },
}
