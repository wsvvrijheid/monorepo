import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { ArtWithDetails } from './ArtWithDetails'

export default {
  component: ArtWithDetails,
  title: 'Shared/ArtWithDetails',
} as Meta

type Story = StoryObj

const StoryWithHook: StoryFn = () => {
  return <ArtWithDetails />
}

export const Default: Story = {
  render: StoryWithHook,
}
