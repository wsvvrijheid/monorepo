import { useState } from 'react'

import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'

import { ArtCardBase } from './ArtCardBase'
import { ArtActions } from './types'
import { Container } from '../Container'

export default {
  component: ArtCardBase,
  title: 'Shared/ArtCardBase',
  args: {
    art: ART_MOCKS.data[0],
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof ArtCardBase>

type Story = StoryObj<typeof ArtCardBase>

const StoryWithHook: StoryFn<typeof ArtCardBase> = args => {
  const [isLiked, setIsLiked] = useState(args.isLiked)
  const [art, setArt] = useState(args.art)

  const toggleLike = () => {
    setArt({ ...art, likes: (art.likes || 0) + (isLiked ? -1 : 1) })
    setIsLiked(!isLiked)
  }

  const actions: ArtActions = {
    delete: {
      title: 'Delete',
      buttonText: 'Delete',
      colorScheme: 'red',
      text: 'Are you sure you want to delete this art?',
      onClick: () => alert('Deleted'),
    },
    publish: {
      title: 'Publish',
      buttonText: 'Publish',
      colorScheme: 'primary',
      text: 'Are you sure you want to publish this art?',
      onClick: () => alert('Published'),
    },
    unpublish: {
      title: 'Unpublish',
      buttonText: 'Unpublish',
      colorScheme: 'red',
      text: 'Are you sure you want to unpublish this art?',
      onClick: () => alert('Unpublished'),
    },
  }

  return (
    <ArtCardBase
      {...args}
      art={art}
      isLiked={args.isLiked || isLiked}
      toggleLike={toggleLike}
      isOwner={args.isOwner || USER_MOCKS[0].id === art.artist?.id}
      actions={actions}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}

export const Liked: Story = {
  render: StoryWithHook,
  args: { isLiked: true },
}

export const Masonry: Story = {
  render: StoryWithHook,
  args: { isMasonry: true },
}

export const Owner: Story = {
  render: StoryWithHook,
  args: { isOwner: true },
}

export const Unpublished: Story = {
  render: StoryWithHook,
  args: { isOwner: true, art: ART_MOCKS.data[1] },
}
