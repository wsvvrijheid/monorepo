import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'
import { StoryFn } from '@storybook/types'

import { UploadFile } from '@wsvvrijheid/types'

import { FeedbackForm } from './FeedbackForm'

export default {
  title: 'Forms/FeedbackForm',
  component: FeedbackForm,
  args: {},
} as Meta<typeof FeedbackForm>

type Story = StoryObj<FeedbackFormProps>

type FeedbackFormProps = {
  image: UploadFile
  comment: string
  point: number
}
const StoryWithHook: StoryFn<FeedbackFormProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const { mutateAsync } = useRecommendTweet()data: FeedbackFormFieldValues

  const handleSubmit = async () => {
    // const recommendedTweet: FeedbackCreateInput = {
    //  ''
    // }

    // await mutateAsync(recommendedTweet, {
    //   onSuccess: () => {
    //     onClose()
    //   },
    // })
    onClose()
  }
  const handleSizeClick = () => {
    onOpen()
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Open Feedback Form`}
      </Button>
      <FeedbackForm
        {...args}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
