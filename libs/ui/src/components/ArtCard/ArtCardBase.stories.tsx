import { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../Container'
import { ArtCardBase } from './ArtCardBase'
import { ArtActions } from './types'

export default {
  component: ArtCardBase,
  title: 'Shared/ArtCardBase',
  args: {
    art: ART_MOCKS.tr.data[0],
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof ArtCardBase>

const Template: ComponentStory<typeof ArtCardBase> = args => {
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
      colorScheme: 'green',
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
      isOwner={args.isOwner || USER_MOCKS[0].id === art.artist?.user?.id}
      actions={actions}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Liked = Template.bind({})
Liked.args = {
  isLiked: true,
}

export const Masonry = Template.bind({})
Masonry.args = {
  isMasonry: true,
}

export const Owner = Template.bind({})
Owner.args = {
  isOwner: true,
}

export const Unpublished = Template.bind({})
Unpublished.args = {
  isOwner: true,
  art: ART_MOCKS.tr.data[1],
}
