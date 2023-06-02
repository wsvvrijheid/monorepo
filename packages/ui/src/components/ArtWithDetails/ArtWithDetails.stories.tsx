import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sample } from 'lodash'
import { useRouter } from 'next/router'

import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { ArtWithDetails, ArtWithDetailsProps } from './ArtWithDetails'

const sampleArt = sample(ART_MOCKS.data)!

export default {
  component: ArtWithDetails,
  title: 'Shared/ArtWithDetails',
} as Meta<ArtWithDetailsProps>

type Story = StoryObj<ArtWithDetailsProps>

const StoryWithHook: StoryFn<ArtWithDetailsProps> = args => {
  const { locale } = useRouter()

  return (
    <ArtWithDetails
      {...args}
      art={sampleArt}
      queryKey={['art', locale, sampleArt.slug]}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
