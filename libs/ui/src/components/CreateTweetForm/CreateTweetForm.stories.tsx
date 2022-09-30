import * as React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { TWEET_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { RecommendedTweetCreateInput, Tweet } from '@wsvvrijheid/types'
import { useRecomendTweet } from '@wsvvrijheid/utils'

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

  // const queryKey = ''
  const { mutateAsync } = useRecomendTweet()

  const handleSubmit = async (
    text: string,
    originalTweet: Tweet,
    media: Blob,
  ) => {
    const recomendedTweet: RecommendedTweetCreateInput = {
      recommender: USER_MOCKS?.[0].id,
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      media,
      text,
    }

    await mutateAsync(recomendedTweet, {
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
