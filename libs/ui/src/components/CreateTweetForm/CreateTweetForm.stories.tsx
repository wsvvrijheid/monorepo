import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { TWEET_MOCKS } from '@wsvvrijheid/mocks'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { RecommendedTweetCreateInput, Tweet } from '@wsvvrijheid/types'

import { CreateTweetForm } from './CreateTweetForm'
import { CreateTweetFormProps } from './types'

export default {
  title: 'Forms/CreateTweetForm',
  component: CreateTweetForm,
  args: {
    originalTweet: TWEET_MOCKS?.[1],
  },
} as Meta<typeof CreateTweetForm>

const Template: Story<CreateTweetFormProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutateAsync } = useRecommendTweet()

  const handleSubmit = async (
    text: string,
    originalTweet: Tweet,
    mentions: number[],
    image?: File,
  ) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      image,
      text,
      mentions: [],
    }

    await mutateAsync(recommendedTweet, {
      onSuccess: () => {
        onClose()
      },
    })
    onClose()
  }
  const handleSizeClick = () => {
    onOpen()
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Create Tweet`}
      </Button>
      <CreateTweetForm
        {...args}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        originalTweet={args.originalTweet}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
