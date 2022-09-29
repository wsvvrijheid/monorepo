import { useState } from 'react'
import * as React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { TWEET_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { RecommendedTweetCreateInput } from '@wsvvrijheid/types'
import { useRecommendTweet } from '@wsvvrijheid/utils'

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
  const [images, setImages] = useState<Blob[]>([])

  const recommendTweetMutation = useRecommendTweet()

  const handleSubmit = async (tweet: string) => {
    const recomendedTweet: RecommendedTweetCreateInput = {
      recommender: USER_MOCKS?.[0].id,
      originalTweet: JSON.parse(JSON.stringify(args.originalTweet)),
      media: images,
      text: tweet,
    }

    await recommendTweetMutation.mutateAsync(recomendedTweet, {
      onSuccess: () => {
        onClose()
      },
    })
    console.log('new original Tweet', recomendedTweet)
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
        images={images}
        setImages={setImages}
        originalTweet={args.originalTweet}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
