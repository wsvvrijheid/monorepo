import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'
import { StoryFn } from '@storybook/types'

import { CreateUserFeedbackFormProps } from './types'
import { UserFeedbackForm } from './UserFeedbackForm'

export default {
  title: 'Forms/UserFeedbackForm',
  component: UserFeedbackForm,
  args: {},
} as Meta<typeof UserFeedbackForm>

type Story = StoryObj<CreateUserFeedbackFormProps>

const StoryWithHook: StoryFn<CreateUserFeedbackFormProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSizeClick = () => {
    onOpen()
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Open UserFeedback Form`}
      </Button>
      <UserFeedbackForm {...args} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
