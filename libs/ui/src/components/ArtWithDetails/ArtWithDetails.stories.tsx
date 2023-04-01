import { Meta, Story } from '@storybook/react'
import { ART_MOCKS } from '@wsvvrijheid/mocks'
import { sample } from 'lodash'
import { useRouter } from 'next/router'

import { ArtWithDetails, ArtWithDetailsProps } from './ArtWithDetails'

const sampleArt = sample(ART_MOCKS.data)!

export default {
  component: ArtWithDetails,
  title: 'Shared/ArtWithDetails',
} as Meta<ArtWithDetailsProps>

const Template: Story<ArtWithDetailsProps> = args => {
  const { locale } = useRouter()
  return (
    <ArtWithDetails
      {...args}
      art={sampleArt}
      queryKey={['art', locale, sampleArt.slug]}
    />
  )
}

export const Default = Template.bind({})
