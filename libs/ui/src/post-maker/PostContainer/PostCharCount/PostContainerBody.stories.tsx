import { useState } from 'react'

import { Textarea, useUpdateEffect } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  setPostText,
  useAppDispatch,
  usePostSelector,
} from '@wsvvrijheid/store'

import { PostCharCount } from './PostCharCount'
import { Container } from '../../../components'

export default {
  title: 'PostMaker/PostCharCount',
  component: PostCharCount,
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof PostCharCount>

const PostTextForm = () => {
  const { postContent } = usePostSelector()
  const [value, setValue] = useState(postContent)

  const dispatch = useAppDispatch()

  useUpdateEffect(() => {
    dispatch(setPostText(value))
  }, [value, dispatch])

  return <Textarea value={value} onChange={e => setValue(e.target.value)} />
}

const Template: ComponentStory<typeof PostCharCount> = () => {
  return (
    <>
      <PostCharCount />
      <PostTextForm />
    </>
  )
}

export const Default = Template.bind({})
