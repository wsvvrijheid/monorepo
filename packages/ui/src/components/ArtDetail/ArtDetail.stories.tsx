import { useState } from 'react'

import { StoryFn, StoryObj, Meta } from '@storybook/react'

import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { ArtDetail } from './ArtDetail'

export default {
  component: ArtDetail,
  title: 'Shared/ArtDetail',
  args: {
    art: ART_MOCKS.data[0],
  },
} as Meta<typeof ArtDetail>

type Story = StoryObj<typeof ArtDetail>

const StoryWithHook: StoryFn<typeof ArtDetail> = args => {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [artData, setArtData] = useState(args.art)

  const toggleLike = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLiked(!isLiked)
      setIsLoading(false)
      setArtData({
        ...artData,
        likes: isLiked ? (artData.likes || 0) - 1 : (artData.likes || 0) + 1,
      })
    }, 1000)
  }

  return (
    <ArtDetail
      {...args}
      art={artData}
      isLiked={isLiked}
      isLoading={isLoading}
      toggleLike={toggleLike}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
