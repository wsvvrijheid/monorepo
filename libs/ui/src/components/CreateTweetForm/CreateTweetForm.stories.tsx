import { useEffect } from 'react'
import * as React from 'react'

import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { TWEET_MOCKS } from '@wsvvrijheid/mocks'

import { CreateTweetForm } from './CreateTweetForm'
import { CreateTweetFormProps } from './types'

export default {
  title: 'Forms/CreateTweetForm',
  component: CreateTweetForm,
  args: {
    tweetContent: TWEET_MOCKS?.[1].text,
    tweetImage: TWEET_MOCKS?.[1].image,
  },
} as Meta<typeof CreateTweetForm>

const Template: Story<CreateTweetFormProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [images, setImages] = React.useState<Blob[]>([])
  const handleSubmit = async () => {
    alert('Hoi')
  }
  const handleSizeClick = () => {
    onOpen()
  }

  useEffect(() => {
    console.log({ images })
  }, [images])

  console.log('args', args)
  console.log('tweet Mocks', TWEET_MOCKS?.[1])
  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Create Tweet`}
      </Button>
      <CreateTweetForm
        {...args}
        onSubmitHandler={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        images={images}
        setImages={setImages}
        tweetContent={args.tweetContent}
        tweetImage={args.tweetImage}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const NoTweetImage = Template.bind({})
NoTweetImage.args = {
  tweetImage: '',
}
