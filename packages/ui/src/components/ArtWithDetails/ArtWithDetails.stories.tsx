import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { ART_MOCKS } from '@fc/mocks'

import { ArtWithDetails, ArtWithDetailsProps } from './ArtWithDetails'

const sampleArt = sample(ART_MOCKS.data)!

export default {
  component: ArtWithDetails,
  title: 'Shared/ArtWithDetails',
} as Meta<ArtWithDetailsProps>

type Story = StoryObj<ArtWithDetailsProps>

const StoryWithHook: StoryFn<ArtWithDetailsProps> = () => {
  return <ArtWithDetails art={sampleArt} />
}

export const Default: Story = {
  render: StoryWithHook,
}
