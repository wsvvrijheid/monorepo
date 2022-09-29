import { useState } from 'react'
import * as React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { TWEET_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
  // StrapiLocale,
} from '@wsvvrijheid/types'
// import { useRecomendedTweet } from '@wsvvrijheid/utils'

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

  // const queryKey = ''
  // const createRecomendedTweet = useRecomendedTweet(queryKey)

  const handleSubmit = async (tweet: string) => {
    const recomendedTweet: RecommendedTweet | RecommendedTweetCreateInput = {
      recommender: USER_MOCKS?.[0].id,
      originalTweet: args.originalTweet,
      media: images,
      text: tweet,
      isArchived: false,
      isShared: false,
    }

    // ;(await createRecomendedTweet).mutate(recomendedTweet, {
    //   onSuccess: () => {
    //     onClose()
    //   },
    // })
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
